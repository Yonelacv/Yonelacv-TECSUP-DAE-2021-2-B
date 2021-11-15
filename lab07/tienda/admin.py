from django.contrib import admin

# Register your models here.
from .models import Categoria, Product

admin.site.register(Categoria)

class ProductAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'categoria' )
admin.site.register(Product, ProductAdmin)
