import { useEffect, useState } from "react"; //trae hooks
import { FlatList, StyleSheet, Text, View } from "react-native"; //importa de la libreria de node los componentes



type Band ={            //extructura del json
  id: number;
  name: string;
  ubication?: string;
  genere?: string;
};


const BASE_URL = "http://192.168.100.12:8080";



export default function Index () {
  //const[bands,setBands]=useState(["Metallica","Queen"]); //crea una lista y le agrega bandas
  const[bands,setBands]=useState<Band[]>([]);    //inicializa una liista pero vacia
  const[generes,setGeneres]=useState(false);

  
  useEffect(()=>{
    fetch(`${BASE_URL}/band/all`)       //realiza get a spring
    .then((res)=>res.json())              //devuelve una promesa y convierte el cuerpo a objetos
    .then((data)=>setBands(data))       //guarda la lista
    .catch((e)=>console.log("Error:",e));


  },[]);


  return(
  <View style={style.container}>                             {/*como un div*/}        
     
    <Text style={style.title}>GESTOR DE CATALOGO</Text>     {/*campo de texto*/}
    

    <FlatList
      data={bands}                                        //lista a mostrar
      keyExtractor={(item)=>String(item.id)}                         //id unico por fila
      renderItem={({item})=><Text style={style.row}>{item.name}</Text>} //que renderizara
    />

  </View>
  ); 
  
}

const style = StyleSheet.create({       //crea un objeto de estilo
  container:{                           //cada uno de estos se le asigna a un objeto     
    flex: 1,
    padding:16,
    paddingTop:56,
    

  },

  title:{
    fontSize:24,
    fontWeight: "bold",
  },

  row:{
    paddingVertical: 8,
    fontSize: 18,
  },

});