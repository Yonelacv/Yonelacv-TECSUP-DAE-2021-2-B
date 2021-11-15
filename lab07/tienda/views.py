from django.shortcuts import get_object_or_404, render
from .models import Categoria, Product
# Create your views here.

def index(request):
    product_list = Product.objects.order_by('nombre')[:6]
    category_list = Categoria.objects.order_by('nombre')
    context = {
        'product_list' : product_list,
        'category_list' : category_list
        }
    return render(request, 'index.html', context)
    
def producto(request, producto_id):
    producto = get_object_or_404(Product, pk=producto_id)
    category_list = Categoria.objects.order_by('nombre')
    return render(request, 'producto.html', {'producto' : producto, 'category_list' : category_list})

def categoria(request, category_id):
    category_list = Categoria.objects.all()
    product_list = Product.objects.filter(categoria_id = category_id)
    return render(request,'categoria.html',{'product_list' : product_list,'category_list' : category_list})

from tienda.carrito import Cart

def agregarCarrito(request,producto_id):
    objProducto = Product.objects.get(id=producto_id)
    carritoProducto = Cart(request)
    carritoProducto.add(objProducto,1)
    print(request.session.get("cart"))
    return render(request,'carrito.html')

def eliminarProductoCarrito(request,producto_id):
    objProducto = Product.objects.get(id=producto_id)
    carritoProducto = Cart(request)
    carritoProducto.remove(objProducto)
    print(request.session.get("cart"))
    return render(request,'carrito.html')

def limpiarCarrito(request):
    CarritoProducto = Cart(request)
    CarritoProducto.clear()
    print(request.session.get("cart"))
    return render(request,'carrito.html')

def carrito(request):
    print(request.session.get("cart"))
    return render(request,'carrito.html')
