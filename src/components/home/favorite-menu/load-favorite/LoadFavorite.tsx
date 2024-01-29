import styles from './load-favorite.module.css'
import { useContext, useState } from 'react'
import { Loader } from '@mantine/core'
import { FavoriteMenuContext, IFavoriteMenuContext } from 'provider/FavoriteProvider'
import { CalculationContext, ICalculationContext } from 'provider/CalculationProvider'
import { deleteFavorite } from 'services/favorite'
import { IconArrowsExchange, IconHexagonLetterR, IconX } from '@tabler/icons-react'
import randomColor from 'utils/randomColor'
import { cloneDeep } from 'lodash'

import moment from 'moment'

const LoadFavorite = () => {
    const { favorite_data, setFavoriteData, setViewModal } = useContext(FavoriteMenuContext) as IFavoriteMenuContext
    const { setCalculationData } = useContext(CalculationContext) as ICalculationContext
    const [error, setError] = useState('')
    const [active_item_id, setActiveItemId] = useState(-1)
    const setFavorite = () => {
        if (active_item_id < 0) return
        const active_item: any = favorite_data!.find(item => item.id == active_item_id)!.data
        active_item.data = active_item.data.map((item: any) => {
            return {
                ...item,
                color: randomColor(),
                name: '',
            }
        })
        active_item.data[0].color = '#E9ECEF'
        setCalculationData(cloneDeep({ ...active_item }))
        setViewModal(false)
    }
    const deleteItem = async (id: number) => {
        try {
            const res = await deleteFavorite(id)
            if (res.status == 200) {
                setFavoriteData(prev => prev!.filter(item => item.id !== res.data.id))
                setActiveItemId(-1)
            }
        } catch (e: any) {
            setError(typeof e === 'string' ? e : 'Неудалось удалить')
        }
    }

    let favorite_content

    if (typeof favorite_data === 'undefined')
        favorite_content = (
            <p className={styles.msg}>
                <Loader />
            </p>
        )
    else if (typeof favorite_data === null) favorite_content = <p className={styles.msg}>Ошибка загрузки</p>
    else if (favorite_data?.length == 0) favorite_content = <p className={styles.msg}>Нету сохранённых конфигураций</p>
    else if (favorite_data)
        favorite_content = favorite_data!.map(item => {
            const current_date = moment(new Date())
            const create_date = moment(new Date(item.create_date))
            const duration = moment.duration(current_date.diff(create_date))

            let pref = 'д'
            let diff = parseInt(String(duration.asDays()))
            if (diff < 1) {
                pref = 'ч'
                diff = parseInt(String(duration.asHours()))
            }
            if (diff < 1) {
                pref = 'мин'
                diff = parseInt(String(duration.asMinutes()))
            }
            if (diff < 1) {
                pref = 'сейчас'
                diff = 0
            }

            return (
                <div
                    key={item.id}
                    className={`${styles.item} ${item.id === active_item_id && styles.active}`}
                    onClick={() => {
                        setActiveItemId(item.id)
                    }}
                >
                    <div className={styles.name_wrapper}>
                        <p className={styles.date}>
                            {diff > 0 && diff}
                            {pref}
                        </p>
                        <p className={styles.name}>{item.name}</p>
                        {item.data.type == 'roc' && <IconHexagonLetterR width={18} color="#7950F2" />}
                        {item.data.type == 'overlay' && <IconArrowsExchange width={18} color="#FAB005" />}
                    </div>
                    <div className={styles.delete} onClick={() => deleteItem(item.id)}>
                        <IconX color="#FA5252" width={17} height={17} />
                    </div>
                </div>
            )
        })

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>
                Сохранённые <span className={styles.count}>{typeof favorite_data === 'object' && favorite_data?.length}</span>
                <span className={styles.error}>{!!error && error}</span>
            </h2>
            <div className={styles.favorite_wrapper}>{favorite_content}</div>
            <button disabled={active_item_id === -1} className={styles.confirm_btn} onClick={() => setFavorite()}>
                Загрузить
            </button>
        </div>
    )
}
export default LoadFavorite
