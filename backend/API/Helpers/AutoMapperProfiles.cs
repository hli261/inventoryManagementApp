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
            CreateMap<Bin, CreateBinDto>();
            CreateMap<CreateBinDto, Bin>();
            CreateMap<UpdateBinDto, Bin>();
            CreateMap<Bin, UpdateBinDto>();

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
            CreateMap<Shipping, Shipping>();

            CreateMap<ShippingMethodDto, ShippingMethod>();

            CreateMap<GetReceivingHeaderDto, Receiving>();
            CreateMap<Receiving, GetReceivingHeaderDto>();
            CreateMap<Receiving, GetReceivingHeaderDto>().ForMember(dest => dest.GetReceivingItemDtos, opt => opt.MapFrom(src => src.ReceivingItems));
            CreateMap<GetReceivingItemDto, ReceivingItem>();
            CreateMap<ReceivingItem, GetReceivingItemDto>();
        }
    }
}