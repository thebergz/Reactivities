using System.Diagnostics;
using AutoMapper;
using Activity = Domain.Activity;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
        }
    }
}