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
from django.db.models.query import QuerySet
import bleach
import json
from .models import Translation
from .serializers import TranslationSerializer


class TranslationList(APIView):
    def get_queryset(self):
        """
        Handle get requests with query param '?q': /translations/?q=hello
        :return: queryset filtered with query param
        """
        queryset = Translation.objects.all()
        inputText = self.request.query_params.get('q', None)
        if inputText is not None:
            inputText = bleach.clean(inputText)
            queryset = queryset.filter(inputText=inputText)[0]
        return queryset

    def get(self, request):
        translations = self.get_queryset()
        many = isinstance(translations, QuerySet)
        serializer = TranslationSerializer(translations, many=many)
        return Response(serializer.data)

    def post(self, request):
        """
        :param request: inputText
        :return: Response with status + json representation of created record
            {'inputText': 'text', 'detectedLanguage': 'en', 'translatedText': translation}
        """
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
