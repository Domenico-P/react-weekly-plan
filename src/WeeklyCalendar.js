import React, { Component } from "react";
import { DateTime } from "luxon";
import "./WeeklyCalendar.css";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

export default class WeeklyCalendar extends Component {
  static defaultProps = {
    rows: [],
    overscanBefore: null,
    overscanAfter: null,
    renderRowLabel: row => null,
    renderWeekCell: (row, weekYear, weekNumber) => null,
    addPlan: (weekYear, weekNumber, id) => null,
    removeUser: (name, id) => null
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

  keyPressed = e => {
    //console.log(e.key);
    if (e.key === "ArrowRight") {
      this.handleMoveForward(e);
    } else if (e.key === "ArrowLeft") {
      this.handleMoveBackward(e);
    } else return;
  };

  scrollChange = e => {
    e.preventDefault();
    if (e.deltaX < 0) {
      this.handleMoveForward(e);
    } else if (e.deltaX > 0) {
      this.handleMoveBackward(e);
    } else return;
  };

  dropPlan = event => {
    event.preventDefault();
    console.log("DROP");
  };

  dragEnterPlan = event => {
    event.preventDefault();
    console.log("DRAG ENTER");
  };

  dropLeavePlan = event => {
    event.preventDefault();
    console.log("DROP LEAVE");
  };

  render() {
    const {
      rows,
      renderWeekCell,
      renderRowLabel,
      overscanBefore,
      overscanAfter,
      addPlan,
      removeUser,
      dropPlan,
      dragEnterPlan,
      dropLeavePlan
    } = this.props;

    const { targetDateTime } = this.state;
    const visibleWeeks = [];

    for (
      let overscan = -overscanBefore;
      overscan <= overscanAfter;
      overscan += 1
    ) {
      visibleWeeks.push(targetDateTime.plus({ week: overscan }));
    }

    return (
      <div className="WeeklyCalendar">
        <table
          id="scroll"
          className="WeeklyCalendar-table"
          onKeyDown={this.keyPressed}
          onWheel={this.scrollChange}
          tabIndex="0"
        >
          <thead>
            <tr>
              <th onClick={this.handleMoveBackward}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-arrow-left"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </th>
              {visibleWeeks.map(dateTime => {
                const {
                  weekYear,
                  day,
                  year,
                  month,
                  weekday,
                  daysInMonth
                } = dateTime;
                let local = DateTime.local();
                let firstDayWeek = day - (weekday - 1);
                let lastDayWeek = firstDayWeek + 6;
                //console.log(targetDateTime);
                //console.log(DateTime.local().day);
                if (lastDayWeek > daysInMonth) {
                  lastDayWeek = lastDayWeek - daysInMonth;
                }
                if (firstDayWeek < 1) {
                  firstDayWeek = firstDayWeek + DateTime.local().daysInMonth;
                }
                if (
                  local.day === day &&
                  local.year === year &&
                  local.month === month
                )
                  if (firstDayWeek > lastDayWeek)
                    return (
                      <th className="WeeklyCalendar-table-tr-th-local">
                        Dal {String(firstDayWeek)}/{String(month)} al{" "}
                        {String(lastDayWeek)}/{String(month + 1)}{" "}
                        {String(weekYear)}
                      </th>
                    );
                  else
                    return (
                      <th className="WeeklyCalendar-table-tr-th-local">
                        Dal {String(firstDayWeek)}/{String(month)} al{" "}
                        {String(lastDayWeek)}/{String(month)} {String(weekYear)}
                      </th>
                    );
                else if (firstDayWeek > lastDayWeek)
                  return (
                    <th>
                      Dal {String(firstDayWeek)}/{String(month)} al{" "}
                      {String(lastDayWeek)}/{String(month + 1)}{" "}
                      {String(weekYear)}
                    </th>
                  );
                else
                  return (
                    <th>
                      Dal {String(firstDayWeek)}/{String(month)} al{" "}
                      {String(lastDayWeek)}/{String(month)} {String(weekYear)}
                    </th>
                  );
              })}
              <th onClick={this.handleMoveForward}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-arrow-right"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr>
                <td>
                  <IconButton onClick={() => removeUser(row.name, row.id)}>
                    <DeleteIcon />
                  </IconButton>{" "}
                  {renderRowLabel(row)}
                </td>
                {visibleWeeks.map(d => (
                  <td
                    id="dropZone"
                    className="Td-week"
                    onClick={() => addPlan(d.weekYear, d.weekNumber, row.id)}
                    onDrop={dropPlan}
                    onDragEnter={dragEnterPlan}
                    onDragLeave={dropLeavePlan}
                  >
                    {renderWeekCell(row, d.weekYear, d.weekNumber)}
                  </td>
                ))}
                <td className="Td-week-empty" />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
