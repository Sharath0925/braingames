from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('reaction-test/', views.reaction_test, name='reaction_test'),
     path('math/', views.math_quiz, name='math_quiz'),
       path('memory/', views.memory_game_view, name='memory_game'),
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('check-pending-score/', views.check_pending_score, name='check_pending_score'),
    path('submit-score/', views.submit_score, name='submit_score'),
    path('view_scores/', views.view_scores, name='view_scores'),
]
