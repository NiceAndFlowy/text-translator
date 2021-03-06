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
        queryset = Translation.objects.all().order_by('-id')
        input_text = self.request.query_params.get('q', None)
        if input_text is not None:
            input_text = bleach.clean(input_text)
            try:
                queryset = queryset.filter(inputText=input_text).order_by('-id')[0]
            except IndexError:
                return Response({'detail': 'Does not exist'}, status=status.HTTP_404_NOT_FOUND)
        return queryset

    def get(self, request):
        translations = self.get_queryset()
        many = isinstance(translations, QuerySet)
        serializer = TranslationSerializer(translations, many=many)
        try:
            return Response(serializer.data)
        except AttributeError:
            return Response({'detail': 'Does not exist'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        """
        :param request: inputText
        :return: Response with status + json representation of created record OR errors
            {'inputText': 'text', 'detectedLanguage': 'en', 'translatedText': translation}
        """
        try:
            input_text = request.data['inputText']
            detected_lang = detect(input_text)
            sanitized_input_text = bleach.clean(input_text)
        except KeyError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        to_lang = 'en'
        translated_text = translate(sanitized_input_text, to_lang, "auto")
        data = {'inputText': sanitized_input_text, 'detectedLanguage': detected_lang, 'translatedText': translated_text}
        serializer = TranslationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
