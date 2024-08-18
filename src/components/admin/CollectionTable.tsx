// import 'dotenv/config'
// const serverOrigin = process.env.REACT_APP_SERVER
import { Link } from 'react-router-dom';
import React, { useRef, useState, RefObject, createRef } from 'react'

type Datas = {
  id: number;
  name: string;
  created_at: string;
}

type Table = {
  column: number;
  datas: Datas[] | [];
  heading: string[] | [];
  to: string;
}

type Months = {
  [key: string] : string;
}

const months: Months = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December',
}

export default function CollectionTable(props: Table) {
  const [checkbox, setCheckbox] = useState(false)
  const { datas, column, heading, to } = props

  const tableRowRefs = useRef<RefObject<HTMLInputElement>[]>([]);

  if (datas.length) {
    tableRowRefs.current = Array.from({ length: datas.length }, () => createRef<HTMLInputElement>());
  }

  function checkBoxHandler(state: boolean) {
    tableRowRefs.current.forEach((row) => {
      if (row && row.current) row.current.checked = !state;
    });
    setCheckbox(!state)
  }

  return (
    <div className="table-wrapper">
      <div className="table" style={{'--repeat-count': column} as React.CSSProperties}>
        <div className="table__heading">
          <div className="table__row">
            {/* select all products in this page*/}
            <div className="table__cell">
              <input type="checkbox" name="select_all_products" id="select_all_products" onClick={() => checkBoxHandler(checkbox)}/> 
            </div>

            {
              heading && heading.length > 0 ?
              heading.map((name, idx) => {
                return(
                  <div key={idx} className="table__cell">{name}</div>
                )
              })
              : ''
            }
          </div>
        </div>

        <div className="table__body">
          {
            datas.map((data, idx) => {
              const date = data.created_at.split('T')[0].split('-')
              const year  = date[0];
              const month = months[date[1]];
              const day   = date[2];
              
              return (
                <div key={idx} className="table__row">
                  <div className="table__cell">
                    <input type="checkbox" name="select_product" id="select_product" ref={tableRowRefs.current[idx]}/> 
                  </div>
                  <div className="table__cell">
                    <Link to={[to, data.id].join('/')}>{data.name}</Link>
                  </div>
                  <div className="table__cell">{`${month} ${day}, ${year}`}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}