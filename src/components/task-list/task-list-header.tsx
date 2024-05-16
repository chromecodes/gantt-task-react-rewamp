import React, { useEffect, useState } from "react";
import styles from "./task-list-header.module.css";

export const TaskListHeaderDefault: React.FC<{
  headerHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  labels: object
}> = ({ headerHeight, fontFamily,  fontSize, rowWidth, labels }) => {
  const [lang, setLang] = useState<Record<string, string> | undefined>();

  useEffect(() => {
    setLang({...labels})
  }, [labels]);
  
  return (
    ( lang !== undefined) ? 
    <div
      className={styles.ganttTable}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize,
      }}
    >
      <div
        className={styles.ganttTable_Header}
        style={{
          height: headerHeight - 2,
        }}
      >
        <div
          className={styles.ganttTable_HeaderItem}
          style={{
            minWidth: rowWidth,
          }}
        >
          &nbsp;{lang['name'] ? `${lang['name'] ?? 'Name'}` : ''}
        </div>
        <div
          className={styles.ganttTable_HeaderSeparator}
          style={{
            height: headerHeight * 0.5,
            marginTop: headerHeight * 0.2,
          }}
        />
        <div
          className={styles.ganttTable_HeaderItem}
          style={{
            minWidth: rowWidth,
          }}
        >
          &nbsp;{lang['from'] ? `${lang['from'] ?? 'From'}` : ''}
        </div>
        <div
          className={styles.ganttTable_HeaderSeparator}
          style={{
            height: headerHeight * 0.5,
            marginTop: headerHeight * 0.25,
          }}
        />
        <div
          className={styles.ganttTable_HeaderItem}
          style={{
            minWidth: rowWidth,
          }}
        >
          &nbsp;{lang['to'] ? `${lang['to'] ?? 'To'}` : ''}
        </div>
      </div>
    </div> : <span></span>
  );
};
