from graphene_django import DjangoObjectType
import graphene
from .models import PersonalNote as PersonalNoteModel 


# ---- Query Stuff ----

class PersonalNote(DjangoObjectType):

    class Meta:
        model = PersonalNoteModel 
        # Describe the data as a node in the graph
        interfaces = (graphene.relay.Node,)

class Query(graphene.ObjectType):
    personalnotes = graphene.List(PersonalNote)

    def resolve_personalnotes(self, info):
        """Decide which notes to return.""" 

        user = info.context.user # Find with debugger

        if user.is_anonymous: 
            return PersonalNoteModel.objects.none()
        else:
            return PersonalNoteModel.objects.filter(user=user)

# ---- Mutation Stuff ----

class CreatePersonalNote(graphene.Mutation):
    # inputs when creating
    class Arguments: 
        title = graphene.String()
        content = graphene.String()
    # outputs after creating
    personalnote = graphene.Field(PersonalNote)
    ok = graphene.Boolean()
    status = graphene.String()

    def mutate(self, info, title, content):
        user = info.context.user 

        if user.is_anonymous: 
            return CreatePersonalNote(ok=False, status="Must be logged in!")
        else: 
            new_note = PersonalNoteModel(title=title, content=content, user=user)
            new_note.save()
            return CreatePersonalNote(personalnote=new_note, ok=True, status="ok")

class Mutation(graphene.ObjectType):
    create_personal_note = CreatePersonalNote.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)


# NOTES -----------------------------------------------------------------
#after you run your server, to bring up the GraphQL data, go to this address in browser: http://127.0.0.1:8000/graphql/

#EXAMPLE OF WHAT TO PUT IN GRAPHQL SITE WHILE LOGGED IN AS ADMIN
# mutation{
#   createPersonalNote(title:"test with beej", content:"content2") {
#     personalnote{
#       id
#       title
#     	content
#   	}
#   	ok
#     status
# 	}
# }

# OUTPUT EXAMPLE{
#   "data": {
#     "createPersonalNote": {
#       "personalnote": {
#         "id": "UGVyc29uYWxOb3RlOjMyZTFhNWU3LWQxYjItNGE2OC05OWUyLWYyNDEzNmNkZTliYg==",
#         "title": "test with beej",
#         "content": "content2"
#       },
#       "ok": true,
#       "status": "ok"
#     }
#   }
# }