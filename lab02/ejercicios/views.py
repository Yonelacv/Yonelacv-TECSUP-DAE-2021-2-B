from django.shortcuts import render

# Create your views here.

def operaciones(request):
    context = {
        'titulo' : 'Formulario',
    }
    return render(request, 'operaciones.html')

def respuesta(request):
   
    a = request.POST['Numero1']
    b = request.POST['Numero2']
    ope = request.POST['ope']

    if ope == "Sumar":
        respuesta = int(a) + int(b)
    elif ope == "Restar":
        respuesta = int(a) - int(b)
    else:
        respuesta = int(a) * int(b)
  
    context = {
        'ope': ope,
        'a' : a,
        'b' : b,
        'resultado' : respuesta
    }
  
    return render(request,'respuesta.html',context)
   
def volumencilindro(request):
    context = {
        'titulo' : 'Formulario',
    }
    return render(request, 'volumencilindro.html')


def result(request):
    from math import pi
    a = request.POST['diametro']
    b = request.POST['altura']
    result = pi * ((float(a)/2)*(float(a)/2) )* float(b)
    context = {
        'a' : a,
        'b' : b,
        'result' : result
    }
    
    return render(request,'result.html',context)


