 
 function getBuildingsLevelsInstances() {

    let buildingsData = [];

    buildings.forEach((itemBuilding)=> {
  
        const buildingLevels = levels.filter((itemLevel) => {           
            return itemLevel.Building.guid === itemBuilding.guid
        }).map((itemLevel2) => {

            const levelInstances = instances.filter((itemInstance)=> {
               
                if (itemInstance.hasOwnProperty('Floor') && itemLevel2.hasOwnProperty('guid')) {
                    if (itemInstance.Floor!== null) {
                        return ( itemInstance.Floor.guid === itemLevel2.guid);                        
                    }                    
                }
              
                return false;
                
            }).map((itemInstance2)=> {
                return {
                    name: itemInstance2.GlobalName + " (" +itemInstance2.guid + ")",
                    guid: itemInstance2.guid,
                }
            });

            return {
                name: itemLevel2.Name + " (" +itemLevel2.guid + ")",
                guid: itemLevel2.guid,
                children: levelInstances
            }
        });


        buildingsData.push ({
            name: itemBuilding.Name + " (" +itemBuilding.guid + ")",
            guid: itemBuilding.guid,
            children: buildingLevels
        })

    })
   
    return {
        name: "Bimeye",
        children: buildingsData
    }
 }
 function getBuildingsRoomsInstances() {

    let buildingsData = [];

    buildings.forEach((itemBuilding)=> {
  
        const buildingRooms = rooms.filter((itemRoom) => {           
            return itemRoom.Building.guid === itemBuilding.guid
        }).map((itemRoom2) => {

            const roomInstances = instances.filter((itemInstance)=> {
               
                if (itemInstance.hasOwnProperty('FromRoom') ) {
                    if (itemInstance.FromRoom!== null) {
                        return ( itemInstance.FromRoom.guid === itemRoom2.guid);                        
                    }                    
                }

                if (itemInstance.hasOwnProperty('ToRoom') ) {
                    if (itemInstance.ToRoom!== null) {
                        return ( itemInstance.ToRoom.guid === itemRoom2.guid);                        
                    }                    
                }

                if (itemInstance.hasOwnProperty('InRoom')) {
                    if (itemInstance.InRoom!== null) {
                        return ( itemInstance.InRoom.guid === itemRoom2.guid);                        
                    }                    
                }
              
                return false;
                
            }).map((itemInstance2)=> {
                return {
                    name: itemInstance2.GlobalName + " (" +itemInstance2.guid + ")",
                    guid: itemInstance2.guid,
                }
            });            

            return {
                name: itemRoom2.Name + " - Number: " + itemRoom2.Number + " (" +itemRoom2.guid + ")",
                guid: itemRoom2.guid,
                children: roomInstances

            }
        });


        buildingsData.push ({
            name: itemBuilding.Name+ " (" +itemBuilding.guid + ")",
            guid: itemBuilding.guid,
            children: buildingRooms
        })

    })

    console.log("buildings", buildingsData)
    return {
        name: "Bimeye",
        children: buildingsData
    }
 }
 function getBuildingsPartition()  {   

    let buildingsData = [];

    buildings.forEach((itemBuilding)=> {
  
        const buildingLevels = levels.filter((itemLevel) => {           
            return itemLevel.Building.guid === itemBuilding.guid
        }).map((itemLevel2) => {

            const levelInstances = instances.filter((itemInstance)=> {
               
                if (itemInstance.hasOwnProperty('Floor') && itemLevel2.hasOwnProperty('guid')) {
                    if (itemInstance.Floor!== null) {
                        return ( itemInstance.Floor.guid === itemLevel2.guid);                        
                    }                    
                }
              
                return false;
                
            }).map((itemInstance2)=> {
                return {
                    name: itemInstance2.GlobalName,
                    guid: itemInstance2.guid,
                    size: 1,
                }
            });

            return {
                name: itemLevel2.Name,
                guid: itemLevel2.guid,
                size: 1,
                children: levelInstances
            }
        });


        buildingsData.push ({
            name: itemBuilding.Name,
            guid: itemBuilding.guid,
            size: 1,
            children: buildingLevels
        })

    })

    console.log("buildings", buildingsData)
    return {
        name: "Bimeye",
        children: buildingsData
    }
 }