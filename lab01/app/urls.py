from django.urls import path
from app.views import multiplicacion, resta, suma 
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('sumar/<int:num1>/<int:num2>',suma),
    path('restar/<int:num1>/<int:num2>',resta),
    path('multiplicar/<int:num1>/<int:num2>',multiplicacion)
]