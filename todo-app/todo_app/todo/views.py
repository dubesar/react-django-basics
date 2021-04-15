from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from todo.models import todo
from todo.serializers import todoSerializer


@csrf_exempt
def todo_list(request):
    if (request.method == 'GET'):
        todos = todo.objects.all()
        serializer = todoSerializer(todos, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif (request.method == 'POST'):
        data = JSONParser().parse(request)
        serializer = todoSerializer(data=data)
        if (serializer.is_valid()):
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
def todo_details(request, pk):
    try:
        todos = todo.objects.get(pk=pk)
    except:
        return HttpResponse(status=400)

    if (request.method == 'GET'):
        serializer = todoSerializer(todos)
        return JsonResponse(serializer.data)
    elif (request.method == 'PUT'):
        data = JSONParser().parse(request)
        serializer = todoSerializer(todos, data=data)
        if (serializer.is_valid()):
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    elif (request.method == 'DELETE'):
        todos.delete()
        return HttpResponse(status=200)
