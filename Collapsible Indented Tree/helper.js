 
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
 function getSingleBuildingCategoriesLevelsInstances(buildingGuid) {   

    let buildingsData = [];

    const categories = getDistinctCategories(instances);


    categories.forEach((itemCategory)=> {

    let numberOfInstancesPerCategory =0;
    
        const buildingLevels = levels.filter((item)=> {
           
            return item.Building.guid === buildingGuid;
        } )
        .map((itemLevel) => {

            const levelInstances = instances.filter((itemInstance)=> {          
               
                if (itemInstance.hasOwnProperty('Floor') && itemLevel.hasOwnProperty('guid')) {
                    if (itemInstance.Floor!== null) {
                        return ( itemInstance.Floor.guid === itemLevel.guid &&
                            itemCategory === itemInstance.GlobalCategory);                        
                    }                    
                }
              
                return false;
                
            }).map((itemInstance2)=> {
                return {
                    name: itemInstance2.GlobalName+ "("+itemInstance2.guid+")",
                    guid: itemInstance2.guid,
                   
                }
            });
            numberOfInstancesPerCategory+=levelInstances.length
            return {
                name: itemLevel.Name + "("+itemLevel.guid+")" + " -  Number of items: " + levelInstances.length,
                guid: itemLevel.guid,               
                children: levelInstances
            }
        });


        buildingsData.push ({
            name: itemCategory + " -  Number of items: " + numberOfInstancesPerCategory,
            guid: itemCategory,          
            children: buildingLevels
        })

    })

    return {
        name: "Bimeye",
        children: buildingsData
    }
    
 }

 function getBuildingsCategoriesLevelsInstances() {   

    let result = [];    

    const categories = getDistinctCategories(instances);

    const buildingsData = buildings.map((itemBuilding)=> {
        numberOfInstancesPerBuilding =0
       
        const categoryData = categories.map((itemCategory)=> { 
            numberOfInstancesPerCategory =0
            
            const buildingLevels = levels.filter((item)=> {
               
                return item.Building.guid === itemBuilding.guid;
            } )
            .map((itemLevel) => {
               
               
                numberOfInstancesPerLevel =0
              const levelInstances = instances.filter((itemInstance)=> {          
                
                if (itemInstance.hasOwnProperty('Floor') && itemLevel.hasOwnProperty('guid')) {
                    if (itemInstance.Floor!== null) {
                        return ( itemInstance.Floor.guid === itemLevel.guid &&
                            itemCategory === itemInstance.GlobalCategory);                        
                    }                    
                }
            
                return false;
                
            }).map((itemInstance2)=> {
                numberOfInstancesPerLevel+=1
                return {
                    name: itemInstance2.GlobalName+ "("+itemInstance2.guid+")",
                    guid: itemInstance2.guid,
                
                }
            });
                
                numberOfInstancesPerCategory+=levelInstances.length
                return {
                    name: itemLevel.Name + "("+itemLevel.guid+")" + " -  Number of items: " + numberOfInstancesPerLevel,
                    guid: itemLevel.guid,
                    children: levelInstances               
                 
                }
            });
            numberOfInstancesPerBuilding+=numberOfInstancesPerCategory

            return  {
                guid: itemCategory,
                name: itemCategory + " -  Number of items: " + numberOfInstancesPerCategory,
                children: buildingLevels,             
            } 
        });
       
        return {
            guid: itemBuilding.guid,
            name: itemBuilding.Name+ "("+itemBuilding.guid+")" + " -  Number of items: " + numberOfInstancesPerBuilding,
            children: categoryData
        } 


    });

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
 function getBuildingsPartition(buildingGuid)  {   

    let buildingsData = [];

    const categories = getDistinctCategories(instances);


    categories.forEach((itemCategory)=> {
  
        const buildingLevels = levels.filter((item)=> {
            return item.Building.guid === buildingGuid;
        } )
        .map((itemLevel) => {

            const levelInstances = instances.filter((itemInstance)=> {
               
                if (itemInstance.hasOwnProperty('Floor') && itemLevel.hasOwnProperty('guid')) {
                    if (itemInstance.Floor!== null) {
                        return ( itemInstance.Floor.guid === itemLevel.guid &&
                            itemCategory ===itemInstance.GlobalCategory);                        
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
                name: itemLevel.Name,
                guid: itemLevel.guid,
                size: 1,
               // children: levelInstances
            }
        });


        buildingsData.push ({
            name: itemCategory,
            guid: itemCategory,
            size: 1,
            children: buildingLevels
        })

    })

    console.log("categories", getDistinctCategories(instances))
    return {
        name: "Bimeye",
        children: buildingsData
    }
    
 }
 function getDistinctCategories(array) {

    var flags = [], output = [], l = array.length, i;
    for( i=0; i<l; i++) {
        if( flags[array[i].GlobalCategory]) continue;
        flags[array[i].GlobalCategory] = true;
        output.push(array[i].GlobalCategory);
    }

    return output;


 }

 /*
        categories.forEach((itemCategory)=> {

            let numberOfInstancesPerCategory =0;
        
            const buildingLevels = levels.filter((item)=> {
            
                return item.Building.guid === itemBuilding.guid;
            } )
            .map((itemLevel) => {

                const levelInstances = instances.filter((itemInstance)=> {          
                
                    if (itemInstance.hasOwnProperty('Floor') && itemLevel.hasOwnProperty('guid')) {
                        if (itemInstance.Floor!== null) {
                            return ( itemInstance.Floor.guid === itemLevel.guid &&
                                itemCategory === itemInstance.GlobalCategory);                        
                        }                    
                    }
                
                    return false;
                    
                }).map((itemInstance2)=> {
                    return {
                        name: itemInstance2.GlobalName+ "("+itemInstance2.guid+")",
                        guid: itemInstance2.guid,
                    
                    }
                });
                numberOfInstancesPerCategory+=levelInstances.length
                return {
                    name: itemLevel.Name + "("+itemLevel.guid+")" + " -  Number of items: " + levelInstances.length,
                    guid: itemLevel.guid,               
                    children: levelInstances
                }
            });


            buildingsData.push ({
                name: itemCategory + " -  Number of items: " + numberOfInstancesPerCategory,
                guid: itemCategory,          
                children: buildingLevels
            })

        })
*/