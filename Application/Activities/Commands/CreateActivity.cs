using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities.Commands
{
    public class CreateActivity
    {
        public class Command : IRequest<Result<string>>
        {
            public required CreateActivityDto ActivityDto { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) 
            : IRequestHandler<Command, Result<string>>
        {
            public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userAccessor.GetUserAsync();
                
                var activity = mapper.Map<Activity>(request.ActivityDto);
                
                context.Activities.Add(activity); //Note: Don't use AddAsync - just Add. Async methods here are only relevant if we need to get a DB generated value I assume such as a GUID. Check the hover over comments for the ASYNC version if required.

                var attendee = new ActivityAttendee
                {
                    ActivityId = activity.Id,
                    UserId = user.Id,
                    IsHost = true
                };
                
                activity.Attendees.Add(attendee);
                
                var result = await context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) return Result<string>.Failure("Failed to create the Activity", 400);

                return Result<string>.Success(activity.Id);
            }
        }
    }
}