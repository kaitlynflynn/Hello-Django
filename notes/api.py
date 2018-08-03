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
    queryset = PersonalNote.objects.none() # .all() returns ALL notes; .none() has been added with the below code to filter 

    def get_queryset(self): # allowed us to customize what defaults we see for notes when logged in
        # import pdb; pdb.set_trace()
        user = self.request.user

        if user.is_anonymous:
            return PersonalNote.objects.none() # if user is anon, return none
        else:
            return PersonalNote.objects.filter(user=user) # otherwise return filtered