from django.db.models import fields
from rest_framework import serializers
from .models import Prestamos

class PrestamosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prestamos
        fields = ('id', 'codigo', 'libro', 'usuario', 'fecPrestamo', 'fecDevolucion')