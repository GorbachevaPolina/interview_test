import React, {useEffect, useState} from "react";
import './css/main.css'

const MainPage = ({setAuth}) => {
    const [table, setTable] = useState([]);
    const [sorts, setSorts] = useState('asc_short');
    const [sortsCount, setSortsCount] = useState({
        'short': 1,
        'target': 0,
        'counter': 0
    })
    const [page, setPage] = useState(0)
    const [input, setInput] = useState('');
    const [squeezedLink, setSqueezedLink] = useState('')

    const sortCol = (e) => {
        const text = e.target.innerText
        if (sortsCount[text] % 2 === 0) {
            setSorts(`asc_${text}`)
        } else {
            setSorts(`desc_${text}`)
        }
        setSortsCount({...sortsCount, [text] : sortsCount[text] + 1})
    }

    const prevPage = () => {
        setPage(page - 15)
    }

    const nextPage = () => {
        setPage(page + 15)
    }

    const onChange = (e) => {
        setInput(e.target.value)
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const access_token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
            const response = await fetch(
                `http://79.143.31.216/squeeze?link=${input}`,
                {
                    method: 'POST',
                    headers: {'Authorization': `Bearer ${access_token}`}
                }
            )
            const parseResponse = await response.json();
            setSqueezedLink(parseResponse.short)
            setInput('')
        } catch (error) {
            console.error(error.message)
        }
    }

    const logout = (e) => {
        e.preventDefault();
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC'
        setAuth(false)
    }


    const getTable = async () => {
        try {
            const access_token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
            const response = await fetch(
                `http://79.143.31.216/statistics?order=${sorts}&offset=${page}&limit=15`,
                {
                    method: 'GET',
                    headers: {'Authorization': `Bearer ${access_token}`}
                }
            )
            const parseResponse = await response.json();
            
            setTable(parseResponse)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getTable()
    }, [sorts, page, squeezedLink])

    return (
        <div className="main-page">
            <div className="main-page__inner">
            <div className="main-page__inner__form">
                <form onSubmit={onSubmitForm}>
                    <input type='text' name='link' placeholder='Введите ссылку' value={input} onChange={e => onChange(e)}/>
                    <button>Сжать</button>
                </form>
            </div>
            {
                table.length > 0 ?
                (<table className="main-page__inner__table">
                <thead>
                <tr onClick={sortCol}>
                    <th>short</th>
                    <th>target</th>
                    <th>counter</th>
                </tr>
                </thead>
                <tbody>
            {
                table.map(function(item) {
                    return (
                        <tr key={item.id}>
                            <td><a href={`http://79.143.31.216/s/${item.short}`}>{item.short}</a></td>
                            <td>{item.target}</td>
                            <td>{item.counter}</td>
                        </tr>
                    )
                })
            }
            </tbody>
            </table>) :
            <span>Пока нет ссылок</span>
            }
            <div>
            {page ? 
            <button onClick={prevPage} className='main-page__inner__prev-btn'>Предыдущая страница</button> :
            null
            }
            {
                table.length === 15 ? 
                <button onClick={nextPage} className='main-page__inner__next-btn'>Следующая страница</button> :
                null
            }
            </div>
            <button onClick={logout} className='main-page__inner__logout-btn'>Выйти</button>
            </div>
        </div>
    )
}

export default MainPage;
