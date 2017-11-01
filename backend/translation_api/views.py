from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from langdetect import detect
from translate import Translator
from mtranslate import translate
import bleach
import json
from .models import Translation
from .serializers import TranslationSerializer


class TranslationList(APIView):
    def get(self, request):
        translations = Translation.objects.all()
        serializer = TranslationSerializer(translations, many=True)
        return Response(serializer.data)

    def post(self, request):
        try:
            inputText = request.data['inputText']
            detectedLanguage = detect(inputText)
            bleachedInputText = bleach.clean(inputText)
        except KeyError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        to_lang = 'en'
        translatedText = translate(bleachedInputText, to_lang, detectedLanguage)
        print('detected language:%s; input:%s; translatedText:%s' %(detectedLanguage, bleachedInputText, translatedText))

        data = {'inputText': bleachedInputText, 'detectedLanguage': detectedLanguage, 'translatedText': translatedText}
        serializer = TranslationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
