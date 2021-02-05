using System;
using System.IO;
using System.Collections.Generic;
using API.Entities;
using System.Linq;
using API.Data;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class CSVService
    {
        private readonly DataContext _db;
        public CSVService(DataContext db)
        {
            _db = db;
        }

        public string ReadItemCsvFile()
        {
            try
            {
                List<Item> result = new List<Item>();
                StreamReader sr = new StreamReader(@"Assets/ItemCsv.csv");
                string strLine = string.Empty;
                string[] value = null;
                int x = -1;
                while (!sr.EndOfStream)
                {
                    x++;
                    strLine = sr.ReadLine();
                    value = strLine.Split(',');
                    if (x > 0 && value.Length == 9)
                    {
                        var item = new Item();
                        item.Id = Int32.Parse(value[0]);
                        item.ItemNumber = value[1];
                        item.ItemDescription = value[2];
                        item.ItemPrice = double.Parse(value[3]);
                        item.UpcCode = value[4];
                        item.ItemStatus = value[5];
                        item.UnitOfMeasure = value[6];
                        item.UomUnit = Int32.Parse(value[7]);
                        item.FDA = value[8];
                        result.Add(item);
                    }
                }

                _db.Items.AddRange(result);
                _db.SaveChanges();

                GC.Collect();


                int counter = _db.Items.Count();
                if (counter < 10)
                {
                    return "Process error less than 10 records";
                }

                return "Completed";
            }
            catch (Exception ex)
            {

                return ex.Message;
            }
        }
  
        public string ReadBinCsvFile()
        {
            try
            {
                List<Bin> result = new List<Bin>();
                StreamReader sr = new StreamReader(@"Assets/BinCsv.csv");
                string strLine = string.Empty;
                string[] value = null;
                int x = 0;
                while (!sr.EndOfStream)
                {
                    x++;
                    strLine = sr.ReadLine();
                    value = strLine.Split(',');
                    if (x > 1 && value.Length == 7)
                    {
                        try{
                        var bin = new Bin();
                        bin.Id = Int32.Parse(value[0]);
                        bin.BinCode = value[1];
                        bin.BinTypeId = Int32.Parse(value[2]);
                        bin.BinReference = value[3];
                        bin.Creator = value[4];
                        bin.CreateTime = DateTime.Parse(value[5]);
                        bin.WarehouseLocationId = Int32.Parse(value[6]);
                        result.Add(bin);

                        }
                        catch(Exception ex){
                            string ms = ex.Message;
                        }
                
                    }
                }

                _db.Bins.AddRange(result);
                _db.SaveChanges();

                GC.Collect();

                int counter = _db.Bins.Count();
                if (counter < 10)
                {
                    return "Process error less than 10 records";
                }

                return "Completed";
            }
            catch(DbUpdateException efex){
                efex.Message.FirstOrDefault();

                return "Not pass because db";

            }
            catch (Exception ex)
            {

                return ex.Message;
            }
        }


        public string ReadBinItemCsvFile()
        {
            try
            {
                List<BinItem> result = new List<BinItem>();
                StreamReader sr = new StreamReader(@"Assets/BinItemCsv.csv");
                string strLine = string.Empty;
                string[] value = null;
                int x = 0;
                while (!sr.EndOfStream)
                {
                    x++;
                    strLine = sr.ReadLine();
                    value = strLine.Split(',');
                    if (x > 1 && value.Length == 4)
                    {
                        try{
                            var binItem = new BinItem();
                            binItem.Id = Int32.Parse(value[0]);
                            binItem.BinId = Int32.Parse(value[1]);
                            binItem.ItemId = Int32.Parse(value[2]);
                            binItem.Quantity = Int32.Parse(value[3]);

                            result.Add(binItem);
                        }
                        catch(Exception ex){
                                string msg = ex.Message;
                        }
                    }
                }

                _db.BinItems.AddRange(result);
                _db.SaveChanges();

                GC.Collect();


                int counter = _db.BinItems.Count();
                if (counter < 10)
                {
                    return "Process error less than 10 records";
                }

                return "Completed";
            }
            catch(DbUpdateException efex){
                efex.Message.FirstOrDefault();
                return "Not pass because db";

            }
            catch (Exception ex)
            {

                return ex.Message;
            }
        }

        public string ReadBinTypeCsvFile()
        {
            try
            {
                List<BinType> result = new List<BinType>();
                StreamReader sr = new StreamReader(@"Assets/BinTypeCsv.csv");
                string strLine = string.Empty;
                string[] value = null;
                int x = -1;
                while (!sr.EndOfStream)
                {
                    x++;
                    strLine = sr.ReadLine();
                    value = strLine.Split(',');
                    if (x > 0 && value.Length == 2)
                    {
                        var binType = new BinType();
                        binType.Id = Int32.Parse(value[0]);
                        binType.TypeName = value[1];
                      
                        result.Add(binType);
                    }
                }

                _db.BinTypes.AddRange(result);
                _db.SaveChanges();

                GC.Collect();


                int counter = _db.BinTypes.Count();
                if (counter < 10)
                {
                    return "Process error less than 10 records";
                }

                return "Completed";
            }
            catch (Exception ex)
            {

                return ex.Message;
            }
        }
  
        public string ReadWarehouseLocationCsvFile()
        {
            try
            {
                List<WarehouseLocation> result = new List<WarehouseLocation>();
                StreamReader sr = new StreamReader(@"Assets/WarehouseLocationCsv.csv");
                string strLine = string.Empty;
                string[] value = null;
                int x = -1;
                while (!sr.EndOfStream)
                {
                    x++;
                    strLine = sr.ReadLine();
                    value = strLine.Split(',');
                    if (x > 0 && value.Length == 2)
                    {
                        var warehouseLocation = new WarehouseLocation();
                        warehouseLocation.Id = Int32.Parse(value[0]);
                        warehouseLocation.LocationName = value[1];
                      
                        result.Add(warehouseLocation);
                    }
                }

                _db.WarehouseLocations.AddRange(result);
                _db.SaveChanges();

                GC.Collect();


                int counter = _db.WarehouseLocations.Count();
                if (counter < 10)
                {
                    return "Process error less than 10 records";
                }

                return "Completed";
            }
            catch (Exception ex)
            {

                return ex.Message;
            }
        }
        public async Task<BinType> GetBinTypeById(int id)
        {
            return await _db.BinTypes.SingleOrDefaultAsync(x => x.Id == id);
        }

         public async Task<WarehouseLocation> GetWarehouseLocationById(int id)
        {
            return await _db.WarehouseLocations.SingleOrDefaultAsync(x => x.Id == id);
        }
    }

}