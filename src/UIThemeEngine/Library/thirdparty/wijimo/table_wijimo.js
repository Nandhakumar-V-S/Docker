
// Reference
{

}

//constants
{

}

// Events
{
    // On Page Ready
    $(function () {
        bindAccounts(lstaskAccountsTask);
        resizeGridHeight();
    });

}

// Public
{
    // Adjust Grid Container Height
    {
        var resizeGridHeight = function () {
            var wHeight = $(window).innerHeight();
            var aFooterHeight = 0;
            var aHeaderHeight = 40;
            var asHeaderHeight = 90;
            //var aHeaderHeight = $('.header.navbar.navbar-inverse.navbar-fixed-top').innerHeight();
            //var asHeaderHeight = $('.isc-page-header-container').innerHeight();
            var asFilterHeight = ($('.isc-filter-container').is(":visible") ? $('.isc-filter-container').innerHeight() + 15 : 0);
            console.log("wHeight: " + wHeight + ", aFooterHeight: " + aFooterHeight + ", aHeaderHeight: " + aHeaderHeight + ", asHeaderHeight: " + asHeaderHeight + ", asFilterHeight: " + asFilterHeight);
            var additionalHeight = 95;
            $('#theGrid').css('max-height', (parseInt(wHeight) - (parseInt(aHeaderHeight) + parseInt(asHeaderHeight) + parseInt(asFilterHeight) + parseInt(aFooterHeight))) - additionalHeight + 'px');
            $('#theGrid').css('height', (parseInt(wHeight) - (parseInt(aHeaderHeight) + parseInt(asHeaderHeight) + parseInt(asFilterHeight) + parseInt(aFooterHeight))) - additionalHeight + 'px');
            $('#theGrid').css('min-height', '90px');

        }

    }

    // Remove Evaluation Text
    {
        var RemoveEvaluationText = function () {
            var bodyElement = document.getElementsByTagName('BODY')[0].children;
            for (var i = bodyElement.length - 1; i >= 0; i--) {
                var body = bodyElement[i];
                if (body.innerText.includes('Wijmo Evaluation') || body.innerText.includes('Wijmo license')) {
                    body.remove();
                }
            }
        }
    }

    // Bind Account list into DOM
    {
        var bindAccounts = function (lst) {

            // Slice data per page
            {
                var viewData = new wijmo.collections.CollectionView(lst, {
                    pageSize: 10
                });
            }

            // Grid Rendering
            {
                var theGrid = new wijmo.grid.FlexGrid('#theGrid', {
                    autoRowHeights: true,
                    autoGenerateColumns: false,
                    allowPinning: wijmo.grid.AllowPinning.None,
                    frozenColumns: 1,
                    stickyHeaders: true,
                    newRowAtTop: false,
                    showMarquee: false,
                    selectionMode: wijmo.grid.SelectionMode.Cell,
                    columns: [


                        {
                            binding: 'Name', header: 'Name', width: '1.5*', isReadOnly: true,
                            cellTemplate: function (ctx) {
                                return "<div class='wj-div'><div class='wj-img-div'><span class='isc-var12 wj-ico-bor'> GD </span></div>" + "<p class='wj-text'> " + ctx.value + "</p><p class='wj-icon-pop'><i class='fa fa-comment' onclick='myFunction()' style='cursor:pointer'></i>&nbsp;<i class='fa fa-phone isc-icon' style='cursor:pointer' onclick='myFunction2()'></i>&nbsp;<i class='fa fa-plus-square' style='cursor:pointer' isc-icon'></i>&nbsp;<i class='fa fa-pencil style='cursor:pointer' isc-icon'></i>&nbsp;<i class='fa fa-trash'></i>&nbsp;<i class='fa fa-ellipsis-v isc-icon' style='cursor:pointer' onclick='myFunction1()'></i></p>";
                            }
                        },
                        {
                            binding: 'Email', header: 'Email', width: '*', isReadOnly: true,
                            cellTemplate: function (ctx) {
                                return "<span class='isc-var12'> " + ctx.value + "</span>";
                            }
                        },
                        {
                            binding: 'Work', header: 'Work', width: '*', isReadOnly: true,
                            cellTemplate: function (ctx) {
                                return "<span class='isc-var12'> " + ctx.value + "</span>";
                            }
                        },
                        {
                            binding: 'Company', header: 'Company', width: '*', isReadOnly: true,
                            cellTemplate: function (ctx) {
                                return " <span class='isc-var12'> " + ctx.value + "</span>";
                            }
                        },
                        {
                            binding: 'Status', header: 'Status', width: '*', isReadOnly: true,

                            cellTemplate: function (ctx) {
                                return "<i class='fa fa-circle-o isc-status'></i> <span class='isc-var12 isc-schedule'> " + ctx.value + "</span>";
                            }
                        },
                        {
                            binding: 'Owner', header: 'Owner', width: '*', isReadOnly: true,
                            cellTemplate: function (ctx) {
                                return "<span class='isc-var12'> " + ctx.value + "</span>";
                            }
                        }
                        //},
                        //{
                        //    binding: 'Action', header: 'Action', width: '*', isReadOnly: true,
                        //    cellTemplate: function (ctx) {
                        //        return "<i class='fa fa-pencil isc-icon modal-toggle6' onclick='myFunction()' style='cursor:pointer'></i>&nbsp;<i class='fa fa-trash isc-icon' style='cursor:pointer' onclick='myFunction2()'></i>&nbsp;<i class='fa fa-comment isc-icon' style='cursor:pointer' onclick='myFunction1()'></i>&nbsp;<i class='fa fa-phone style='cursor:pointer' isc-icon'></i>";
                        //    }
                        //}

                    ],
                    itemsSource: viewData,
                    allowSorting: true,
                    frozenColumns: 1,
                    formatItem: function (s, e) {
                        if (e.panel == s.topLeftCells) {
                            e.cell.innerHTML = '<span class="column-picker-icon fa fa-cog"></span>';
                        }
                    }
                });

            }
            // store default row height
            var defaultRowHeight = theGrid.rows.defaultSize;
            //
            // make it responsive
            theGrid.addEventListener(window, 'resize', updateGridLayout);
            function updateGridLayout() {
                //
                // show/hide columns
                var narrow = theGrid.hostElement.clientWidth < 600;
                theGrid.columns.forEach(function (col) {
                    col.visible = col.index == 0 ? narrow : !narrow;
                });
                //
                // make rows taller on phone layout
                theGrid.rows.defaultSize = defaultRowHeight * (narrow ? 3 : 1);
                //
                // hide column headers on narrow layouts
                theGrid.headersVisibility = narrow ? wjGrid.HeadersVisibility.None : wjGrid.HeadersVisibility.Column;
            }
    //
            // Checkbox in first column
            {
                // create the Selector on the first row header column
                let selector = new wijmo.grid.selector.Selector(theGrid);

                // add BooleanCheckers to all bound Boolean columns
                theGrid.columns.forEach(col => {
                    if (col.dataType == wijmo.DataType.Boolean) {

                        // set aggregate to show checkboxes on group header rows
                        col.aggregate = wijmo.Aggregate.First;

                        // create the BooleanChecker on the column
                        new wijmo.grid.selector.BooleanChecker(col);
                    }
                });
            }

            // Setup Row Height
            {

            }

            // Remove Extra Column
            {
                //theGrid.rowHeaders.columns.splice(0, 1); // no extra columns
            }

            // adds Excel-like filter
            {
                new wijmo.grid.filter.FlexGridFilter(theGrid, {
                    filterColumns: [
                        'Name', 'Work'
                    ]
                });
            }

            // adds group panel
            //{
            //    new wijmo.grid.grouppanel.GroupPanel('#theGroupPanel', {
            //        placeholder: 'Drag columns here to create groups',
            //        grid: theGrid
            //    });
            ////    }

            // navigate the pages
            {
                new wijmo.input.CollectionViewNavigator('#thePager', {
                    byPage: true,
                    headerFormat: 'Page {currentPage:n0} of {pageCount:n0}',
                    cv: viewData
                });
            }


            // create the column picker
            {
                //var theColumnPicker = new wijmo.input.ListBox('#theColumnPicker', {
                //    itemsSource: theGrid.columns,
                //    checkedMemberPath: 'visible',
                //    displayMemberPath: 'header',
                //    lostFocus: function () {
                //        hidePopup(theColumnPicker.hostElement);
                //    }
                //});

                //// show the column picker when the user clicks the top-left cell
                //var ref = theGrid.hostElement.querySelector('.wj-topleft');
                //ref.addEventListener('mousedown', function (e) {
                //    if (wijmo.hasClass(e.target, 'column-picker-icon')) {
                //        let host = theColumnPicker.hostElement;
                //        if (!host.offsetHeight) {
                //            wijmo.showPopup(host, ref, false, true, false);
                //            theColumnPicker.focus();
                //        }
                //        else {
                //            wijmo.hidePopup(host, true, true);
                //            theGrid.focus();
                //        }
                //        e.preventDefault();
                //    }
                //});

                //// work around Safari/IOS bug (TFS 321525, 361500, 402670)
                //// https://developer.mozilla.org/en-US/docs/Web/Events/click#Safari_Mobile
                //window.addEventListener('touchstart', (e) => {
                //    let host = theColumnPicker.hostElement;
                //    if (!wijmo.contains(host, e.target) && !wijmo.closest(e.target, '.wj-flexgrid')) {
                //        wijmo.hidePopup(host, true, true);
                //    }
                //});

                //// column picker's drag-and-drop
                //var isDragEnabled = true;
                //var dragSrc = null;
                //var dragDst = null;
                ////var dragCheckbox = document.getElementById('enableDrag');
                //enableColumnDrag();
                //function enableColumnDrag() {
                //    var host = theColumnPicker.hostElement;
                //    var items = host.getElementsByClassName('wj-listbox-item');
                //    for (var i = 0; i < items.length; i++) {
                //        enableDragItem(items[i], isDragEnabled);
                //    }
                //}
                //theColumnPicker.formatItem.addHandler(function (s, e) {
                //    enableDragItem(e.item, isDragEnabled);
                //});

                //var theColumnPickerHost = theColumnPicker.hostElement;
                //theColumnPickerHost.addEventListener('dragstart', handleDragStart);
                //theColumnPickerHost.addEventListener('dragover', handleDragOver);
                //theColumnPickerHost.addEventListener('drop', handleDrop);
                //theColumnPickerHost.addEventListener('dragend', handleDragEnd);

                //function enableDragItem(item, enabled) {
                //    item.setAttribute('draggable', enabled);
                //}
                //function handleDragStart(e) {
                //    dragSrc = wijmo.closest(e.target, '.wj-listbox-item');
                //    if (dragSrc) {
                //        e.dataTransfer.setData('text', dragSrc.innerHTML);
                //        e.dataTransfer.effectAllowed = 'move';
                //    }
                //}
                //function handleDragOver(e) {
                //    var dragOver = wijmo.closest(e.target, '.wj-listbox-item');
                //    if (dragDst && dragDst !== dragOver) {
                //        removeDropMarker();
                //    }
                //    if (dragOver && dragOver !== dragSrc) {
                //        e.preventDefault();
                //        e.dataTransfer.dropEffect = 'move';
                //        dragDst = dragOver;
                //        var src = getElementIndex(dragSrc);
                //        var dst = getElementIndex(dragDst);
                //        removeDropMarker();
                //        addDropMarker(dst > src);
                //    }
                //    else {
                //        dragDst = null;
                //    }
                //}
                //function handleDrop(e) {
                //    if (dragSrc && dragDst) {
                //        e.preventDefault();
                //        var src = getElementIndex(dragSrc);
                //        var dst = getElementIndex(dragDst);
                //        theGrid.columns.moveElement(src, dst);
                //    }
                //}
                //function handleDragEnd() {
                //    dragSrc = null;
                //    dragDst = null;
                //    removeDropMarker();
                //}
                //function getElementIndex(element) {
                //    var parent = element.parentElement;
                //    var siblings = Array.prototype.slice.call(parent.children);
                //    return siblings.indexOf(element);
                //}
                //function removeDropMarker() {
                //    wijmo.removeChild(wijmo.getElement('.drop-marker'));
                //}
                //function addDropMarker(isAfterPos) {
                //    const itemsGap = 10;
                //    const width = 6;
                //    var margin = itemsGap / width;
                //    var height = dragDst.clientHeight;
                //    var topPos = dragDst.offsetTop;
                //    var leftPos = isAfterPos
                //        ? (dragDst.offsetLeft + dragDst.clientWidth + margin)
                //        : (dragDst.offsetLeft - itemsGap + margin);
                //    var html = `<div class="drop-marker"
                //        style="top:${topPos}px;left:${leftPos}px;height:${height}px;width:${width}px">
                //        &nbsp
                //    </div>`;
                //    wijmo.createElement(html, theColumnPicker.hostElement);
                //}


            }

            // Remove Evalution
            {
                RemoveEvaluationText();
            }

            // Page Size selection
            {
                let menu = new wijmo.input.Menu("#pageSizeMenu", {
                    itemsSource: [
                        { value: 0, text: 'No Paging' },
                        { value: 10, text: '10' },
                        { value: 15, text: '15' },
                        { value: 30, text: '30' },
                        { value: 50, text: '50' }
                    ],
                    displayMemberPath: 'text',
                    selectedValuePath: 'value',
                    selectedValue: viewData.pageSize,
                    selectedIndexChanged: (sender) => {
                        if (sender.selectedIndex >= 0) {
                            updateMenuHeader(sender);
                            viewData.pageSize = sender.selectedValue;
                        }
                    }
                });
                updateMenuHeader(menu);
                //
                function updateMenuHeader(menu) {
                    if (menu.selectedIndex >= 0) {
                        menu.header = `Page Size: <b>${menu.selectedItem.text}</b>`;
                    }
                }
            }
        }



    }

    $(window).resize(function () {
        resizeGridHeight();
    });
    



}



var lstaskAccountsTask = [
    {
        "Name": "John Wick",
        "Email": "john@gmail.com",
        "Work": "Sales Manager",
        "Company": "John Industries",
        "Status": "Active",
        "Owner": "John David"
    },
    {
        "Name": "Redin Kinsley",
        "Email": "Redin@gmail.com",
        "Work": "HR Manager",
        "Company": "Fabric Industries",
        "Status": "Active",
        "Owner": "Germy"
      
    },
    {
        "Name": "Mathew Thomas",
        "Email": "mathew@gmail.com",
        "Work": "HR Manager",
        "Company": "David Industries",
        "Status": "Active",
        "Owner": "David"
        
    },
    {
        "Name": "James Wan",
        "Email": "james@gmail.com",
        "Work": "Product Manager",
        "Company": "Jhony Industries",
        "Status": "Active",
        "Owner": "David"
    },
    {
        "Name": "Christopher Johnson",
        "Email": "jhonson@gmail.com",
        "Work": "HR Manager",
        "Company": "Fabric Industries",
        "Status": "Active",
        "Owner": "Germy"

    },
    {
        "Name": "Jhon Mckensay",
        "Email": "jhon@gmail.com",
        "Work": "Technical Manager",
        "Company": "David Industries",
        "Status": "Active",
        "Owner": "David"

    },
    {
        "Name": "Redin Kinsley",
        "Email": "kinsley@gmail.com",
        "Work": "Sales Manager",
        "Company": "John Industries",
        "Status": "Active",
        "Owner": "John David"
    },
    {
        "Name": "Mathew Thomas",
        "Email": "mathew29@gmail.com",
        "Work": "HR Manager",
        "Company": "Fabric Industries",
        "Status": "Active",
        "Owner": "Germy"

    },
    {
        "Name": "James wan",
        "Email": "james@gmail.com",
        "Work": "Sales Manager",
        "Company": "David Industries",
        "Status": "Active",
        "Owner": "David"

    },
    {
        "Name": "Christopher Jhonson",
        "Email": "christ@gmail.com",
        "Work": "Technical Manager",
        "Company": "Jhony Industries",
        "Status": "Active",
        "Owner": "David"
    },
    {
        "Name": "John Wick",
        "Email": "john@gmail.com",
        "Work": "Sales Manager",
        "Company": "John Industries",
        "Status": "Active",
        "Owner": "John David"
    },
    {
        "Name": "Redin Kinsley",
        "Email": "Redin@gmail.com",
        "Work": "Marketing Manager",
        "Company": "Fabric Industries",
        "Status": "Active",
        "Owner": "Germy"

    },
    {
        "Name": "Mathew Thomas",
        "Email": "mathew@gmail.com",
        "Work": "Product Manager",
        "Company": "David Industries",
        "Status": "Active",
        "Owner": "David"

    },
    {
        "Name": "James Wan",
        "Email": "james@gmail.com",
        "Work": "Marketing Manager",
        "Company": "Jhony Industries",
        "Status": "Active",
        "Owner": "David"
    },
    {
        "Name": "Christopher Johnson",
        "Email": "jhonson@gmail.com",
        "Work": "Sales Manager",
        "Company": "Fabric Industries",
        "Status": "Active",
        "Owner": "Germy"

    },
    {
        "Name": "Jhon Mckensay",
        "Email": "jhon@gmail.com",
        "Work": "Product Manager",
        "Company": "David Industries",
        "Status": "Active",
        "Owner": "David"

    },
    {
        "Name": "Redin Kinsley",
        "Email": "kinsley@gmail.com",
        "Work": "Marketing Manager",
        "Company": "John Industries",
        "Status": "Active",
        "Owner": "John David"
    },
    {
        "Name": "Mathew Thomas",
        "Email": "mathew29@gmail.com",
        "Work": "Technical Manager",
        "Company": "Fabric Industries",
        "Status": "Active",
        "Owner": "Germy"

    },
    {
        "Name": "James wan",
        "Email": "james@gmail.com",
        "Work": "Sales Manager",
        "Company": "David Industries",
        "Status": "Active",
        "Owner": "David"

    },
    {
        "Name": "Christopher Jhonson",
        "Email": "christ@gmail.com",
        "Work": "HR Manager",
        "Company": "Jhony Industries",
        "Status": "Active",
        "Owner": "David"
    }
];