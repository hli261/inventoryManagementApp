using System.Collections.Generic;

namespace API.DTOs
{
    public class CreateBinItemsDto
    {
        public IEnumerable<CreateBinItemForPutawayDto> createBinItemForPutawayDtos { get; set; }
    }
}