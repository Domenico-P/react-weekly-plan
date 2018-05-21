import React, { Component } from 'react';
import { DateTime } from 'luxon';

import './WeeklyCalendar.css';

export default class WeeklyCalendar extends Component {

  static defaultProps = {
    rows: [],
    overscanBefore: 1,
    overscanAfter: 1,
    renderRowLabel: (row) => null,
    renderWeekCell: (row, weekYear, weekNumber) => null,
    addPlan: (weekYear, weekNumber, id) => null,
    removeUser: (name, id) => null,
  };

  state = {
    targetDateTime: DateTime.local()
  };

  handleMoveBackward = event => {
    const { targetDateTime } = this.state;

    this.setState({
      targetDateTime: targetDateTime.minus({ week: 1 })
    });
  };

  handleMoveForward = event => {
    const { targetDateTime } = this.state;

    this.setState({
      targetDateTime: targetDateTime.plus({ week: 1 })
    });
  };

  render() {

    const {
      rows,
      renderWeekCell,
      renderRowLabel,
      overscanBefore,
      overscanAfter,
      addPlan,
      removeUser
    } = this.props;

    const { targetDateTime } = this.state;

    const visibleWeeks = [];

    for (let overscan = -overscanBefore; overscan <= overscanAfter; overscan += 1) {
      visibleWeeks.push(targetDateTime.plus({ week: overscan }));
    }

    return <div className="WeeklyCalendar">
      <table className="WeeklyCalendar-table">
        <thead>
          <tr>
            <th onClick={this.handleMoveBackward}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left">
              <line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            </th>
            {visibleWeeks.map(dateTime => { const { weekYear, day, weekday, daysInMonth, monthLong} = dateTime;
                                            let localDay = DateTime.local().day;
                                            let firstDayWeek = day - (weekday-1);
                                            let lastDayWeek = firstDayWeek + 6;
                                            //console.log(targetDateTime);
                                            //console.log(DateTime.local().day);
                                            if (lastDayWeek > daysInMonth) {
                                              lastDayWeek = lastDayWeek - daysInMonth;
                                            }
                                            if (firstDayWeek < 1) {
                                              firstDayWeek = firstDayWeek + DateTime.local().daysInMonth;
                                            }
                                            if( localDay === day )
                                            return <th className="WeeklyCalendar-table-tr-th-local">Dal {String(firstDayWeek)} al {String(lastDayWeek)} {String(monthLong)} {String(weekYear)}</th>;
                                            else
                                            return <th>Dal {String(firstDayWeek)} al {String(lastDayWeek)} {String(monthLong)} {String(weekYear)}</th>;
                                          })
            }
            <th onClick={this.handleMoveForward}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right">
                <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row =>
                    <tr>
                      <td><button onClick={ () => removeUser(row.name, row.id) } className="Delete-Button">Elimina</button> {renderRowLabel(row)}</td>
                      {visibleWeeks.map(d => (<td className="Td-week" onClick={ () => addPlan(d.weekYear, d.weekNumber, row.id) } >{renderWeekCell(row, d.weekYear, d.weekNumber)}</td>))}
                      <td>--</td>
                    </tr>
                    )}
        </tbody>
      </table>
    </div>
  }
}
