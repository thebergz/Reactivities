using Application.Activities.Commands;
using Application.Activities.Queries;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class CommentHub(IMediator mediator) : Hub
    {
        public async Task SendComment(AddComment.Command command) //SendComment is called by the client - check spelling!
        {
            var comment = await mediator.Send(command);

            await Clients.Group(command.ActivityId).SendAsync("ReceiveComment", comment.Value);  //ReceiveComment is called by the client - check spelling!
        }
        
        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var activityId = httpContext?.Request.Query["activityId"];

            if (string.IsNullOrEmpty(activityId)) throw new HubException("No activity with this id");

            await Groups.AddToGroupAsync(Context.ConnectionId, activityId!);
            
            var result = await mediator.Send(new GetComments.Query{ActivityId = activityId!});

            await Clients.Caller.SendAsync("LoadComments", result.Value);  //LoadComments is called by the client - check spelling!
        }
    }
}