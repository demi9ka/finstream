import { Button, Menu } from '@mantine/core'
import { IconPlus, IconX } from '@tabler/icons-react'
import { useContext } from 'react'
import { ICalculationContext, CalculationContext } from 'provider/CalculationProvider'
import { EditMenuContext, IEditMenuContext } from 'provider/EditMenuProvider'
import styles from 'components/home/calculator/calculator-list/calculator-item/data-calculator/data-calculator.module.css'
import { useMediaQuery } from '@mantine/hooks'
import { ICalculatorItem } from 'interface'

const EditDataCalculator = () => {
    const { index } = useContext(CalculationContext) as ICalculationContext
    const { menu_item_copy, list_selected_index, setListSelectedId, setListSelectedIndex, setMenuItemCopy } = useContext(EditMenuContext) as IEditMenuContext
    const media_query = useMediaQuery('(max-width:700px)')

    const removeItem = (id: number) => {
        menu_item_copy!.data = menu_item_copy!.data.reduce((acc, item, item_id) => {
            if (item_id + 1 === id) return [...acc, { id: item.id, action_id: menu_item_copy!.data.length == id + 1 ? undefined : null }]
            if (item_id === id) {
                return [...acc]
            }
            return [...acc, item]
        }, [] as ICalculatorItem['data'])
        setMenuItemCopy({ ...menu_item_copy! })
        if (id === menu_item_copy!.data.length && list_selected_index == id) setListSelectedIndex(id - 1)
        if (id === 0 && list_selected_index === id) setListSelectedIndex(0)
    }
    return (
        <div className={`${styles.wrapper} ${styles.edit}`} style={!media_query ? { paddingBottom: '16px' } : { paddingTop: '12px' }}>
            {menu_item_copy!.data.map((item, id) => (
                <div key={id} className={styles.item_wrapper}>
                    <div className={styles.remove_wrapper}>
                        <div
                            className={`${styles.item} ${list_selected_index === id && styles.active}`}
                            onClick={() => {
                                setListSelectedId(item.id)
                                setListSelectedIndex(id)
                            }}
                        >
                            {Number.isFinite(item.id) && index!.data.find(el => el.id === item.id!)!.short_name}
                        </div>
                        {id > 0 || menu_item_copy!.data.length > 1 ? (
                            <div className={styles.remove} onClick={() => removeItem(id)}>
                                <IconX width={13} height={13} />
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    {item.action_id !== undefined && (
                        <Menu withArrow trigger="hover" shadow="md" closeDelay={200}>
                            <Menu.Target>
                                <div className={styles.action}>{Number.isFinite(item.action_id) && index!.action[item.action_id!]}</div>
                            </Menu.Target>
                            <Menu.Dropdown>
                                {index!.action.map((item, index) => (
                                    <Menu.Item
                                        key={index}
                                        onClick={() => {
                                            menu_item_copy!.data[id].action_id = index
                                            setMenuItemCopy({ ...menu_item_copy! })
                                        }}
                                    >
                                        {item}
                                    </Menu.Item>
                                ))}
                            </Menu.Dropdown>
                        </Menu>
                    )}
                </div>
            ))}
            <Button
                w={100}
                h={30}
                bg={'#228be60c'}
                ml={37}
                style={{ border: '1px solid #228be663' }}
                onClick={() => {
                    menu_item_copy!.data.push({
                        id: null,
                        action_id: undefined,
                    })
                    if (menu_item_copy!.data.length > 1) menu_item_copy!.data[menu_item_copy!.data.length - 2].action_id = null
                    setListSelectedId(null)
                    setListSelectedIndex(menu_item_copy!.data.length - 1)
                    setMenuItemCopy({ ...menu_item_copy! })
                }}
            >
                <IconPlus width={18} color="#228be6" />
            </Button>
        </div>
    )
}
export default EditDataCalculator
