import { FC, useContext } from 'react'
import styles from './management.module.css'
import { CalculationContext, ICalculationContext } from 'provider/CalculationProvider'
import { IEditMenuContext, EditMenuContext } from 'provider/EditMenuProvider'
import { IconX, IconDots, IconSwitchVertical, IconScissors } from '@tabler/icons-react'
import { Menu, Switch } from '@mantine/core'
import getDefaultValue from 'utils/getDefaultValue'
import { ICalculatorData } from 'interface'

const ItemManagement: FC<{ id: number }> = ({ id }) => {
    const { calculation_data, setCalculationData, INDEX_DATA } = useContext(CalculationContext) as ICalculationContext
    const { setListSelectedId, setMenuItemId, setListSelectedIndex } = useContext(EditMenuContext) as IEditMenuContext
    return (
        <div className={styles.wrapper}>
            {calculation_data.data[id].reverse && <IconSwitchVertical width={25} height={25} className={styles.option_icon} color="#40C057" />}
            {calculation_data.crop_id === id && <IconScissors width={25} height={25} className={styles.option_icon} color="#E64980" />}
            <Menu width={180} trigger="hover" openDelay={200} closeDelay={400} position="top-end" withArrow>
                <Menu.Target>
                    <IconDots className={styles.icon}></IconDots>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item
                        py={5}
                        px={5}
                        closeMenuOnClick={false}
                        rightSection={<Switch checked={calculation_data.data[id].reverse} style={{ pointerEvents: 'none' }} size="xs" />}
                        leftSection={<IconSwitchVertical width={17} />}
                        onClick={() => {
                            setCalculationData(prev => {
                                prev.data[id].reverse = !prev.data[id].reverse

                                return { ...prev }
                            })
                        }}
                    >
                        Реверс
                    </Menu.Item>
                    <Menu.Item
                        py={5}
                        px={5}
                        closeMenuOnClick={false}
                        rightSection={<Switch checked={calculation_data.crop_id === id} style={{ pointerEvents: 'none' }} size="xs" />}
                        leftSection={<IconScissors width={17} />}
                        onClick={() => {
                            setCalculationData(prev => {
                                if (prev.crop_id === id) prev.crop_id = null
                                else prev.crop_id = id
                                return { ...prev }
                            })
                        }}
                    >
                        Обрезать
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
            <IconX
                color="#FA5252"
                onClick={() => {
                    const update_calculation_data: ICalculatorData = {
                        ...calculation_data,
                        data: calculation_data.data.filter((_, i) => i !== id),
                    }
                    if (!update_calculation_data.data.length) {
                        update_calculation_data.data.push(getDefaultValue(INDEX_DATA[0][0]))
                        setCalculationData(update_calculation_data)
                        setMenuItemId(0)
                        setListSelectedId(0)
                        setListSelectedIndex(0)
                    } else {
                        setCalculationData(update_calculation_data)
                    }
                }}
                className={styles.icon}
            />
        </div>
    )
}
export default ItemManagement
