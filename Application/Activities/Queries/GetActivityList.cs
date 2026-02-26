using Application.Activities.DTOs;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries
{
    public class GetActivityList
    {
        public class Query : IRequest<List<ActivityDto>>{} //this is the return type for the Query eg List of Activities. Keys required to perform the query will be listed below as properties.

        public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, List<ActivityDto>> //Always takes Query + whatever we are returning. Note we had to manually add AppDbContext since we will need to access the DB to return the data in Handle()
        {
            public async Task<List<ActivityDto>> Handle(Query request, CancellationToken cancellationToken) //After entering the interface above, let the IDE generate the methods
            {
                return await context.Activities
                    .ProjectTo<ActivityDto>(mapper.ConfigurationProvider,
                        new {currentUserId = userAccessor.GetUserId()})
                    .ToListAsync(cancellationToken: cancellationToken);
            }
        }
    }
}