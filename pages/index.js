import Head from 'next/head'
import React,{ useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [search,setSearch] = useState('')
  const [courses,setCourses] = useState(null)
  const [InfoPer,setInfoPer] = useState(null)
  const onChangeHandler=(e)=>{
    setSearch(e.target.value.toUpperCase())
  }

  const getInfoPer=()=>{
    fetch(`https://api-universidad-jmc.herokuapp.com/students/${search}`).then(response => response.json()).then(data2=>{
        setInfoPer(data2.data)
    })
}
  
  const getcourses=()=>{
      fetch(`https://api-universidad-jmc.herokuapp.com/students/${search}/getCourses`).then(response => response.json()).then(data=>{
          setCourses(data.data)
      })
  }


  const getProm=()=>{
    let temp=0,aux=0
    courses.forEach((c)=>{
     temp = temp + c.CREDITO * c.pivot.NOTA
     aux = aux + c.CREDITO
    })

    return Math.round((temp/aux)).toFixed(2) ;

  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Universidad</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <input type="text" placeholder="Ingrese codigo (Ej:AOO1)" onChange={onChangeHandler} value={search}></input>
          <button onClick={function(event){ getcourses(); getInfoPer()}} >Obtener</button>          
          {courses!=null?(<><List data={courses}/> <p>PROMEDIO: {getProm()}</p>  <List data2={InfoPer}/> </>  ):null}
          
        </div>
      </main>

    </div>
  )
}





const List=({data})=>{


  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    CODIGO
                  </th>        
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    CURSO
                  </th>    
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    CREDITO
                  </th>  
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    NOTA
                  </th>          
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((course) => (
                  <tr key={course.email}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.CODCUR}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.NOMCUR}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.CREDITO}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.pivot.NOTA}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )


}