import React from 'react';
/*import { Spin } from 'antd';*/


const ListFilter = () => {


    const handleChange = (selectedValue) => {

        const ebModal = document.getElementById('isc-filter-modal');

        if (selectedValue = 'filter')
            document.getElementById('isc-filter-modal').style.display = "block";
        // if (selectedValue = 'groupby')
        // document.getElementById('isc-filter-modal1').style.display = "block";
        if (selectedValue = 'custable')
            document.getElementById('isc-filter-modal2').style.display = "block";

    };






    return (
        <div className="isc-app-filter-container p-2">
            <div className="row ">
                <div className="col-8 mt-1">
                    <div className="d-flex">
                        <div className="isc-filter-sec col-2 col-xs-3">
                            <fieldset>
                                <details>
                                    <summary className="multi-select-summary">Contact Owner <i className="fa fa-angle-down"></i></summary>
                                    <ul className="multi-select">
                                        <li className="isc-multiselect-tit">Contact Owner (21)</li>
                                        <li>
                                            <input type="text" className="form-control input-sm" placeholder="Search Contact" /></li>
                                        <li>
                                            <ul className="d-flex p-0 isc-filter-select">
                                                <li><a href="#">Select all</a></li>
                                                <li><a href="#">Deselect all</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul className="p-0 isc-multi-checkbox">
                                                <li className="isc-checked">
                                                    <label>
                                                        <input type="checkbox" className="multi-select-checkbox" name="fc" value="" defaultChecked></input>Redin Kinsley</label></li>
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

                                        </li>
                                        <li><ul className="d-flex multi-select-button"><li>Reset</li>
                                            <li className="btn btn-primary btn-sm">Apply</li>
                                        </ul></li>
                                    </ul>
                                </details>
                            </fieldset>

                        </div>
                        <div className="isc-filter-sec col-2 col-xs-3">
                            <fieldset>
                                <details>
                                    <summary className="multi-select-summary">Create Date <i className="fa fa-angle-down"></i></summary>

                                </details>
                            </fieldset>
                        </div>
                        <div className="isc-filter-sec col-2 col-xs-3">
                            <fieldset>
                                <details>
                                    <summary className="multi-select-summary">Contact Status <i className="fa fa-angle-down"></i></summary>
                                    <ul className="multi-select">
                                        <li className="isc-multiselect-tit">Contact Status (21)</li>
                                        <li>
                                            <input type="text" className="form-control input-sm" placeholder="Search Contact" /></li>
                                        <li>
                                            <ul className="d-flex p-0 isc-filter-select">
                                                <li><a href="#">Select all</a></li>
                                                <li><a href="#">Deselect all</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul className="p-0 isc-multi-checkbox">
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

                                        </li>

                                    </ul>
                                </details>
                            </fieldset>

                        </div>
                        <div className="isc-filter-sec col-2 col-xs-3">
                            <fieldset>
                                <details>
                                    <summary className="multi-select-summary">Work <i className="fa fa-angle-down"></i></summary>
                                    <ul className="multi-select">
                                        <li className="isc-multiselect-tit">Work (21)</li>
                                        <li>
                                            <input type="text" className="form-control input-sm" placeholder="Search Contact" /></li>
                                        <li>
                                            <ul className="d-flex p-0 isc-filter-select">
                                                <li><a href="#">Select all</a></li>
                                                <li><a href="#">Deselect all</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul className="p-0 isc-multi-checkbox">
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

                                        </li>

                                    </ul>
                                </details>
                            </fieldset>

                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <ul className="float-end isc-filter-rght-sec">
                        <li className="me-4"><a href="#" className="" id="isc-filter" onClick={(e) => handleChange('filter')}><i className="fa fa-filter"></i>Filter</a></li>
                        <li className="me-4"><i className="fa fa-sitemap" onClick={(e) => handleChange('groupby')}></i>Group by</li>
                        <li>
                            <button className="btn btn-secondary btn-sm" id="cust-table" onClick={(e) => handleChange('custable')}><i className="fa fa-id-card"></i>Customize Table</button></li>
                    </ul>

                </div>
            </div>
        </div>
    );
};
export default ListFilter;



//const PageLoader = () => {
//    return (
//        <div className="centerAbsolute">
//            {<Spin size="large" />}
//        </div>
//    );
//};
