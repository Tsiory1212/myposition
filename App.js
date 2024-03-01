import { View, Text, StyleSheet } from "react-native";
import * as SQL from "expo-sqlite";
import { useEffect, useState } from "react";

const db = SQL.openDatabase('test.db');

export default function App(){
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      height: 100,
      justifyContent: 'center'
    }
  })

  const [table, setTable] = useState(null);
  const [forceUptadeId, forceUpdate] = useForceUpdate();
  
  useEffect(() => {
    db.exec([{sql: "PRAGMA foreign_keys = ON;", args: []}], false, () => {
      console.log('foreign keys turned on');
    })
    db.transaction((tx) => {
      tx.executeSql("CREATE TABLE IF NOT EXIST users (id INT PRIMARY KEY, name VARCHAR(250) NOT NULL);", [], () => {console.log('table users created'), (e) => {console.warn('table users error :', e)}});
    })
  }, []);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM users;");
    })
  }, []);

  return(
      <View style={styles.container}>
       <Text>{JSON.stringify(table)}</Text>
      </View>
  )

 
}