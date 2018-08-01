from rest_framework import serializers, viewsets
from .models import PersonalNote

class PersonalNoteSerializer(serializers.HyperlinkedModelSerializer): 
    """Describe the model and fields we want to use."""

    def create(self, validated_data): # ** = keyword args
        # import pdb; pdb.set_trace() # ; = line separator 
        user = self.context['request'].user
        note = PersonalNote.objects.create(user=user, **validated_data)
        return note 

    class Meta: # subclass must be named meta
        model = PersonalNote
        fields = ('title', 'content', 'url')

class PersonalNoteViewSet(viewsets.ModelViewSet): 
    """Describe the rows we want from the DB."""

    serializer_class = PersonalNoteSerializer
    queryset = PersonalNote.objects.all()