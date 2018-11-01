function mergeOrgzAndUsersData(orgz, users) {

    orgz.forEach((orgItem)=> {

        var orgzUsers = users.filter((item)=> {
            return item.org_id === orgItem.id ;
        })
        .map((mapItem) => {

            var nins = {
                id: mapItem.user_id,
                name: mapItem.name, 
                slug: mapItem.slug,
                completed: mapItem.completed,
                 size: mapItem.completed,
                index: mapItem.index,
                parent: orgItem.name 
            };

            orgz.push(nins)
            return nins;
        });
    });

    // set org structure
    var dataOrgMap = orgz.reduce(function(map, node) {
        map[node.name] = node;
                return map;
        }, {}
    );

    var LvOrgTreeData = [];

    orgz.forEach(function(node) {
        // add to parent
        var parent = dataOrgMap[node.parent];
        if (parent) {
            // create child array if it doesn't exist
            (parent.children || (parent.children = []))
                // add node to child array
                .push(node);
        } else {
            // parent is null or missing
            LvOrgTreeData.push(node);
        }
    });	

    return LvOrgTreeData[0];

}