from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.


def index(request):
    return HttpResponse("Saludos desde la vista operadores!")

def suma(request,num1,num2):
    var1 = int(num1)
    var2 = int(num2)
    result = "El resultado de la suma de los numeros es: %s" % (var1+var2)
    return HttpResponse(result)

def resta(request,num1,num2):
    var1 = int(num1)
    var2 = int(num2)
    result = "El resultado de la resta de los numeros es: %s" % (var1-var2)
    return HttpResponse(result)

def multiplicacion(request,num1,num2):
    var1 = int(num1)
    var2 = int(num2)
    result = "El resultado de la multliplicación de los numeros es: %s" % (var1*var2)
    return HttpResponse(result)