from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from .models import Prestamos
from .serializers import PrestamosSerializer
# Create your views here.

@api_view(['GET'])
def index(request):
    return Response({'mensaje': 'Api rest de Prestamos'})

@api_view(['GET', 'POST'])
def prestamos(request):
    if request.method == 'GET':
        listaPrestamos = Prestamos.objects.all()
        serPrestamos = PrestamosSerializer(listaPrestamos, many=True)
        return Response(serPrestamos.data)
    elif request.method == 'POST':
        serPrestamos = PrestamosSerializer(data=request.data)
        if serPrestamos.is_valid():
            serPrestamos.save()
            return Response(serPrestamos.data)
        else:
            return Response(serPrestamos.errors)

@api_view(['GET', 'PUT', 'DELETE'])
def prestamodetalle(request,prestamos_id):
    objPrestamos = Prestamos.objects.get(id= prestamos_id)

    if request.method == 'GET':
        serPrestamos = PrestamosSerializer(objPrestamos)
        return Response(serPrestamos.data)
    elif request.method == 'PUT':
        serPrestamos = PrestamosSerializer(objPrestamos,data=request.data)
        if serPrestamos.is_valid():
            serPrestamos.save()
            return Response(serPrestamos.data)
        else:
            return Response(serPrestamos.errors)

    elif request.method == 'DELETE':
        objPrestamos.delete()
        return Response(status=204)
       