import React, { useEffect, useState } from "react";
import styles from "./task-list-table.module.css";
import { Task } from "../../types/public-types";
import {  format } from "date-fns";

export const TaskListTableDefault: React.FC<{
  rowHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  locale: string;
  dateFormat: string;
  tasks: Task[];
  selectedTaskId: string;
  setSelectedTask: (taskId: string) => void;
  onExpanderClick: (task: Task) => void;
}> = ({
  rowHeight,
  rowWidth,
  tasks,
  fontFamily,
  fontSize,
  locale,
  dateFormat,
  onExpanderClick,
}) => {
  const [localeVar, setLocaleVar] = useState<Locale | undefined>();

  function convertLangCode(input : string) {
    const pattern = /^([a-z]{2})(-?)([A-Z])/;
    return input.replace(pattern, (match, p1, p2, p3) => p2 ? match : `${p1}-${p3}`);
  }

  useEffect(() => {
    import(`date-fns/locale/${convertLangCode(locale)}/index.js`).then((module) => {
      setLocaleVar(module.default);
    });
  }, [locale]);

  return (
    (locale !== undefined) ? <div
      className={styles.taskListWrapper}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize,
      }}
    >
      {tasks.map(t => {
        let expanderSymbol = "";
        if (t.hideChildren === false) {
          expanderSymbol = "▼";
        } else if (t.hideChildren === true) {
          expanderSymbol = "▶";
        }

        return (
          <div
            className={styles.taskListTableRow}
            style={{ height: rowHeight }}
            key={`${t.id}row`}
          >
            <div
              className={styles.taskListCell}
              style={{
                minWidth: rowWidth,
                maxWidth: rowWidth,
              }}
              title={t.name}
            >
              <div className={styles.taskListNameWrapper}>
                <div
                  className={
                    expanderSymbol
                      ? styles.taskListExpander
                      : styles.taskListEmptyExpander
                  }
                  onClick={() => onExpanderClick(t)}
                >
                  {expanderSymbol}
                </div>
                <div>{t.name}</div>
              </div>
            </div>
            <div
              className={styles.taskListCell}
              style={{
                minWidth: rowWidth,
                maxWidth: rowWidth,
              }}
            >
              &nbsp;{format(t.start, dateFormat, {locale :  localeVar})}
            </div>
            <div
              className={styles.taskListCell}
              style={{
                minWidth: rowWidth,
                maxWidth: rowWidth,
              }}
            >
              &nbsp;{format(t.end, dateFormat, {locale :  localeVar})}
            </div>
          </div>
        );
      })}
    </div> : <div></div>
  );
};
