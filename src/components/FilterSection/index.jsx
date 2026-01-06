import React from 'react';
/*import { Spin } from 'antd';*/


const ListFilterModal = () => {


    const handleChange = (selectedValue) => {

        if (selectedValue = 'filterclose1')
            document.getElementById('isc-filter-modal').style.display = "none";
        if (selectedValue = 'filterclose2')
            document.getElementById('isc-filter-modal1').style.display = "none";
        if (selectedValue = 'filterclose3')
            document.getElementById('isc-filter-modal2').style.display = "none";

        if (selectedValue = 'isc-screen-filter')
            document.getElementById('isc-filter-modal1').style.display = "block";

    };



    return (
        <div>
            <div id="isc-filter-modal" className="isc-filter-modal">

                <div className="isc-filter-modal-content col-md-2">
                    <div>
                        <div className="isc-add-filter d-none">
                            <fieldset>
                                <div>

                                    <ul className="isc-filter-select-search">

                                        <li>
                                            <input type="text" className="form-control input-sm" placeholder="Add a field to filter" /></li>
                                        <li>
                                            <ul className="p-0 isc-filter-search">
                                                <li className="isc-filter-search-head">Popular Filter</li>
                                                <li>
                                                    <label>Redin Kinsley</label></li>
                                                <li>
                                                    <label>John Wick</label></li>
                                                <li className="isc-filter-search-head">Other Filter</li>
                                                <li>
                                                    <label>John Wick</label></li>
                                                <li>
                                                    <label>Mathew Thomas</label></li>
                                                <li className="isc-filter-search-head">Filter</li>
                                                <li>
                                                    <label>John Wick</label></li>
                                                <li>
                                                    <label>Mathew Thomas</label></li>
                                            </ul>

                                        </li>

                                    </ul>
                                </div>
                            </fieldset>
                        </div>
                        <div className="isc-filter-head">

                            <div>
                                <h4 className="isc-filter-tit">Filter <span id="isc-screen-filter" onClick={(e) => handleChange('isc-screen-filter')}><i className="fa fa-cog"></i></span></h4>
                            </div>
                            <div>
                                <p className="btn btn-link isc-filter-btn"><i className="fa fa-plus-circle"></i>Add filter</p>
                                <span className="isc-filter-close" onClick={(e) => handleChange('filterclose1')}>&times;</span>
                            </div>

                        </div>
                    </div>
                    <div className="isc-filter-body">
                        <div className="isc-filter-bdy-head d-flex">
                            <div className="">
                                <h2 className="isc-filter-bdy-tit">Company <span className="isc-filter-head-count">(10)</span></h2>
                            </div>
                            <div className="btn btn-link">Contains <i className="fa fa-caret-down isc-filter-head-count"></i></div>
                            <div className="btn btn-link"><i className="fa fa-times-circle isc-filter-head-close"></i></div>
                        </div>
                        <div className="isc-filter-checkbox">
                            <ul className="p-0 isc-multi-checkbox-filter">
                                <li className="isc-checked">
                                    <label>
                                        <input type="checkbox" className="multi-select-checkbox" name="fc" value="" defaultChecked />Redin Kinsley</label></li>
                                <li>
                                    <label>
                                        <input type="checkbox" className="multi-select-checkbox" name="fc" value="" />John Wick</label></li>
                                <li>
                                    <label>
                                        <input type="checkbox" className="multi-select-checkbox" name="fc" value="" />Mathew Thomas</label></li>
                                <li>
                                    <label>
                                        <input type="checkbox" className="multi-select-checkbox" name="fc" value="" />John Wick</label></li>
                                <li>
                                    <label>
                                        <input type="checkbox" className="multi-select-checkbox" name="fc" value="" />Mathew Thomas</label></li>
                                <li>
                                    <label>
                                        <input type="checkbox" className="multi-select-checkbox" name="fc" value="" />John Wick</label></li>
                                <li>
                                    <label>
                                        <input type="checkbox" className="multi-select-checkbox" name="fc" value="" />Mathew Thomas</label></li>
                            </ul>
                            <div className="isc-filter-more btn-link">More...</div>

                        </div>

                    </div>
                    <div className="isc-filter-bdy-footer ">
                        <div className="isc-filter-bdy-footer-btn d-flex">
                            <button className="btn btn-cancel btn-lg">Cancel</button>
                            <button className="btn btn-primary btn-lg">Apply</button>

                        </div>
                    </div>
                </div>

            </div>

            <div id="isc-filter-modal1" className="isc-filter-modal">

                <div className="isc-filter-modal-content col-md-2">
                    <div>

                        <div className="isc-filter-head">

                            <div>
                                <h4 className="isc-filter-tit">Screen Filters</h4>
                            </div>
                            <div>
                                <span className="isc-filter-close1" onClick={(e) => handleChange('filterclose2')}>&times;</span>
                            </div>

                        </div>
                    </div>
                    <div className="isc-filter-body">
                        <div className="isc-filter-checkbox">
                            <input type="text" placeholder="Search Filter" className="form-control" />
                            <span className="isc-font-search"><i className="fa fa-search"></i></span>
                        </div>
                        <ul className="p-0 isc-screen-filter-checkbox">
                            <li>
                                <label>
                                    <span><i className="fa fa-ellipsis-v" aria-hidden="true"></i><i className="fa fa-ellipsis-v" aria-hidden="true"></i></span>
                                    <input type="checkbox" className="multi-select-checkbox" name="fc" value="" defaultChecked />Redin Kinsley</label></li>
                            <li>
                                <label>
                                    <span><i className="fa fa-ellipsis-v" aria-hidden="true"></i><i className="fa fa-ellipsis-v" aria-hidden="true"></i></span>
                                    <input type="checkbox" className="multi-select-checkbox" name="fc" value="" />John Wick</label></li>
                            <li>
                                <label>
                                    <span><i className="fa fa-ellipsis-v" aria-hidden="true"></i><i className="fa fa-ellipsis-v" aria-hidden="true"></i></span>
                                    <input type="checkbox" className="multi-select-checkbox" name="fc" value="" />Mathew Thomas</label></li>
                            <li>
                                <label>
                                    <span><i className="fa fa-ellipsis-v" aria-hidden="true"></i><i className="fa fa-ellipsis-v" aria-hidden="true"></i></span>
                                    <input type="checkbox" className="multi-select-checkbox" name="fc" value="" />John Wick</label></li>
                            <li>
                                <label>
                                    <span><i className="fa fa-ellipsis-v" aria-hidden="true"></i><i className="fa fa-ellipsis-v" aria-hidden="true"></i></span>
                                    <input type="checkbox" className="multi-select-checkbox" name="fc" value="" />Mathew Thomas</label></li>

                        </ul>
                    </div>
                    <div className="isc-filter-bdy-footer ">
                        <div className="isc-filter-bdy-footer-btn d-flex">
                            <button className="btn btn-cancel btn-lg">Cancel</button>
                            <button className="btn btn-primary btn-lg">Apply</button>

                        </div>
                    </div>
                </div>

            </div>

            <div id="isc-filter-modal2" className="isc-filter-modal">

                <div className="isc-filter-modal-content col-md-2">
                    <div>

                        <div className="isc-filter-head">

                            <div>
                                <h4 className="isc-filter-tit">Cutomize Table</h4>
                            </div>
                            <div>
                                <span className="isc-filter-close2" onClick={(e) => handleChange('filterclose3')}>&times;</span>
                            </div>

                        </div>
                    </div>
                    <div className="isc-filter-body">
                        <div className="isc-filter-checkbox">
                            <input type="text" placeholder="Search Fields" className="form-control" />
                            <span className="isc-font-search"><i className="fa fa-search"></i></span>
                        </div>
                        <ul className="p-0 isc-screen-filter-checkbox">
                            <li className="isc-filter-search-head">Field Visible in table (6/10)</li>
                            <li>
                                <label>
                                    <span><i className="fa fa-ellipsis-v" aria-hidden="true"></i><i className="fa fa-ellipsis-v" aria-hidden="true"></i></span>
                                    <input type="checkbox" className="multi-select-checkbox" name="fc" value="" defaultChecked />Redin Kinsley</label></li>
                            <li>
                                <label>
                                    <span><i className="fa fa-ellipsis-v" aria-hidden="true"></i><i className="fa fa-ellipsis-v" aria-hidden="true"></i></span>
                                    <input type="checkbox" className="multi-select-checkbox" name="fc" value="" />John Wick</label></li>
                            <li>
                                <label>
                                    <span><i className="fa fa-ellipsis-v" aria-hidden="true"></i><i className="fa fa-ellipsis-v" aria-hidden="true"></i></span>
                                    <input type="checkbox" className="multi-select-checkbox" name="fc" value="" />Mathew Thomas</label></li>
                            <li>
                                <label>
                                    <span><i className="fa fa-ellipsis-v" aria-hidden="true"></i><i className="fa fa-ellipsis-v" aria-hidden="true"></i></span>
                                    <input type="checkbox" className="multi-select-checkbox" name="fc" value="" />John Wick</label></li>
                            <li>
                                <label>
                                    <span><i className="fa fa-ellipsis-v" aria-hidden="true"></i><i className="fa fa-ellipsis-v" aria-hidden="true"></i></span>
                                    <input type="checkbox" className="multi-select-checkbox" name="fc" value="" />Mathew Thomas</label></li>

                        </ul>
                    </div>
                    <div className="isc-filter-bdy-footer ">
                        <div className="isc-filter-bdy-footer-btn d-flex">
                            <button className="btn btn-cancel btn-lg">Cancel</button>
                            <button className="btn btn-primary btn-lg">Apply</button>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
export default ListFilterModal;



//const PageLoader = () => {
//    return (
//        <div className="centerAbsolute">
//            {<Spin size="large" />}
//        </div>
//    );
//};
