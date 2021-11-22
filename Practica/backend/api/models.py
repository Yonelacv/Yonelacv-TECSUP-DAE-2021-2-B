from django.db import models

# Create your models here.
class Prestamos(models.Model):

    codigo = models.CharField(max_length=100)
    libro = models.CharField(max_length=100)
    usuario = models.CharField(max_length=100)
    fecPrestamo = models.DateField()
    fecDevolucion = models.DateField()

    def __str__(self):
        return self.codigo