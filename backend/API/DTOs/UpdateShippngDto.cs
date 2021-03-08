using System;

namespace API.DTOs
{
    public class UpdateShippngDto
    {
        public DateTime ArrivalDate { get; set; }
        public string InvoiceNumber { get; set; }
        public string LogisticName { get; set; }
        public string VenderNo { get; set; }
        public string UserEmail { get; set; }
    }
}