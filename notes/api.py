from rest_framework import serializers, viewSets
from .models import PersonalNote

class PersonalNoteSerializer(serializer.HyperLinkModelSerializer): 
    """Describe the model and fields we want to use."""

    class Meta: # subclass must be named meta
        model = PersonalNote
        fields = ('title', 'content')

class PersonalNoteViewSet(viewsets.ModelViewSet): 
    """Describe the rows we want from the DB."""

    serializer_class = PersonalNoteSerializer
    queryset = PersonalNote.objects.all()