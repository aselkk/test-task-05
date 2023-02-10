import { useEffect, useState } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee, faSquare } from '@fortawesome/free-solid-svg-icons'
import { getDatabase, ref, child, get } from "firebase/database";

export const Checkboxes = ({values, checked, setChecked}: {values:any, checked:any, setChecked:any}) => {
  const [expanded, setExpand] = useState();
  const [nodes, setNodes] = useState([])
  const onCheck = (checked:any) => {
    setChecked(checked)
    values.sectors = [...checked]
  };

  const onExpand = (expanded:any) => setExpand(expanded);
  
  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `sectors`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        setNodes(snapshot.val())
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);
    // async function getSectors() {
    //   let data;
    //   const dbRef = ref(getDatabase());
    //   try {
    //     const snapshot = await get(child(dbRef, `sectors`));
    //     if (snapshot.exists()) {
    //       data = snapshot.val();
    //     } else {
    //       console.log("No data available");
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    //   return data;
    // }
    // getSectors()
    // .then((data) => {
    //   setNodes(data);
    // });

  return (
    <div>
      <CheckboxTree
        name='sectorsI'
        showExpandAll={true}
        nativeCheckboxes={true}
        showNodeIcon={false}
        checked={checked}
        expanded={expanded}
        icons={{
          check: <FontAwesomeIcon icon={faCheckSquare} />,
          uncheck: <FontAwesomeIcon icon={faSquare} />,
          halfCheck: <FontAwesomeIcon icon={faCoffee} />,
          expandClose:  <FontAwesomeIcon icon={faCoffee} />,
          expandOpen:  <FontAwesomeIcon icon={faCoffee} />,
          expandAll:  <FontAwesomeIcon icon={faCoffee} />,
          collapseAll:  <FontAwesomeIcon icon={faCoffee} />,
          parentClose: <FontAwesomeIcon icon={faCoffee} />,
          parentOpen:  <FontAwesomeIcon icon={faCoffee} />,
          leaf:  <FontAwesomeIcon icon={faCoffee} />
        }}  
        nodes={nodes}
        onCheck={onCheck}
        onExpand={onExpand}
      />
    </div>
  );
};
