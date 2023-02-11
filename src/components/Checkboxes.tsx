import React, { useEffect, useState, useMemo } from 'react';
import { getDatabase, ref, child, get } from "firebase/database";
import CheckboxTree from 'react-checkbox-tree';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faSquare, faChevronRight, faChevronDown, faMinusSquare } from '@fortawesome/free-solid-svg-icons'
import { CheckboxesProps } from '../types';

export const Checkboxes = React.memo(({values, checked, setChecked}: CheckboxesProps) => {
  const [expanded, setExpand] = useState<string[]>();
  const [nodes, setNodes] = useState([])
  const icons = useMemo(() => ({
    check: <FontAwesomeIcon icon={faCheckSquare} />,
    uncheck: <FontAwesomeIcon icon={faSquare} />,
    halfCheck: <FontAwesomeIcon icon={faMinusSquare} />,
    expandClose:  <FontAwesomeIcon icon={faChevronRight} />,
    expandOpen:  <FontAwesomeIcon icon={faChevronDown} />,
  }), []);  

  const getExpandedNodes = (nodes:any):string[] => {
    return nodes.reduce((acc:string[], ite:any) => {
      if (ite.children?.length) {
        acc.push(ite.value);
        acc.push(...getExpandedNodes(ite.children))
      }
      return acc;
    }, [])
  };
  
  const makeExpanded = useMemo(() => {
    //@ts-ignore
    const expandedNodes = getExpandedNodes(nodes);
    setExpand(expandedNodes);
    return nodes;
  }, [nodes]);

  const onCheck = (checked:string[]) => {
    setChecked(checked)
    if(values){
      values.sectors = [...checked]
    } 
  };
  const onExpand = (expanded: string[]) => setExpand(expanded);
  
  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `sectors`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        setNodes(snapshot.val())
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <div>
      <CheckboxTree
        showNodeIcon={false}
        checked={checked}
        expanded={expanded}
        icons={icons}
        nodes={nodes}
        onCheck={onCheck}
        onExpand={onExpand}
      />
    </div>
  );
});
