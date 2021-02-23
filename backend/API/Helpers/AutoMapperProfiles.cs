using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>();
            CreateMap<RegisterDto, AppUser>();
            CreateMap<MemberUpdateDto, AppUser>();

            CreateMap<BinDto, Bin>();
            CreateMap<Bin, BinDto>();
            CreateMap<Bin, Bin>(); ///?????
            CreateMap<CreateBinDto, Bin>();
            CreateMap<UpdateBinDto, Bin>();

            CreateMap<BinTypeDto, BinType>();
            CreateMap<BinType, BinTypeDto>();
            CreateMap<CreateBinTypeDto, BinType>();

            CreateMap<ItemDto, Item>();
            CreateMap<Item, ItemDto>();
            CreateMap<Item, Item>(); //?????why?
            CreateMap<CreateItemDto, Item>();

            CreateMap<WarehouseLocationDto, WarehouseLocation>();
            CreateMap<WarehouseLocation, WarehouseLocationDto>();
            CreateMap<CreateWarehouseLocationDto, WarehouseLocation>();

            CreateMap<BinItemDto, BinItem>();
            CreateMap<BinItem, BinItemDto>();
            CreateMap<BinItem, BinItem>(); ////???
            CreateMap<CreateBinItemDto, BinItem>();

            CreateMap<ShippingDto, Shipping>();
            CreateMap<Shipping, ShippingDto>();
        }
    }
}