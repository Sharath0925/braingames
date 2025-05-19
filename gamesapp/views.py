from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from pymongo import MongoClient
from datetime import datetime
from django.contrib.auth.forms import AuthenticationForm
from django.views.decorators.csrf import csrf_exempt

# MongoDB setup
client = MongoClient("mongodb://localhost:27017/")
db = client["brain_games_db"]
scores_collection = db["scores"]

# -------------------------------
# Public Views
# -------------------------------

def home(request):
    return render(request, 'home.html')

def reaction_test(request):
    return render(request, 'reaction_test.html')

def math_quiz(request):
    return render(request, "math_quiz.html")

def memory_game_view(request):
    return render(request, 'memory_game.html')

# -------------------------------
# Authentication
# -------------------------------

def signup_view(request):
    if request.method == 'POST':
        username = request.POST.get('username').strip()
        password = request.POST.get('password').strip()

        if not username or not password:
            return render(request, 'signup.html', {'error': 'Username and password required'})

        if User.objects.filter(username=username).exists():
            return render(request, 'signup.html', {'error': 'Username already taken'})

        user = User.objects.create_user(username=username, password=password)
        user.save()
        messages.success(request, 'Signup successful. Please log in.')
        return redirect('login')

    return render(request, 'signup.html')

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('check_pending_score')

    else:
        form = AuthenticationForm()

    return render(request, 'login.html', {'form': form, 'next': request.GET.get('next', '')})



def logout_view(request):
    logout(request)
    return redirect('login')

# -------------------------------
# Score Logic
# -------------------------------

@login_required
def check_pending_score(request):
    return render(request, 'check_score.html')

@login_required
def submit_score(request):
    if request.method == "POST":
        try:
            score = int(request.POST.get("score"))
            game_name = request.POST.get("game", "Unknown")

            scores_collection.insert_one({
                "user": request.user.username,
                "game": game_name,
                "score": score,
                "timestamp": datetime.now()
            })

            return JsonResponse({"status": "success"})
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)

    return JsonResponse({"status": "error", "message": "Invalid method"}, status=405)

@login_required
def view_scores(request):
    username = request.user.username
    scores = list(scores_collection.find({"user": username}).sort("timestamp", -1))
    return render(request, 'view_scores.html', {'scores': scores})
