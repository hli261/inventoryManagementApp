using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles(){
            CreateMap<AppUser, MemberDto>();
            CreateMap<RegisterDto, AppUser>();
            CreateMap<MemberUpdateDto, AppUser>();
            CreateMap<BinDto, Bin>();
            CreateMap<Bin, BinDto>();
            CreateMap<CreateBinDto, Bin>();
        }
    }
}