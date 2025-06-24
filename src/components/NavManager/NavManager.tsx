import React, { useState } from "react";
import './NavManager.css'
import TextInput from "../Form/TextInput";
import { Nav } from "../../model/Nav";
import { NavType } from "../../model/NavType";
import Button from "../Form/Button";
import { INav } from "../../model/INav";

interface NavManagerProps {
    items: INav[];
    onAdd: (item: Nav) => void;
    onEdit: (id: string, item: Nav) => void;
    onDelete: (id: string) => void;
    renderItem: (item: INav) => React.ReactNode;
    title?: string;
}

export default function NavManager<T, D>({ items, onAdd, onEdit, onDelete, renderItem, title }: NavManagerProps) {
    const [navData, setNavData] = useState<Nav>({
        name: '',
        url: ''
    });

    const updateNavFormData = (e: React.FormEvent<any>, str: NavType): void => {
        setNavData({ ...navData, [str]: (e.target as HTMLInputElement).value });
    };

    return (
        <div className="nav-manager">
            <h2>{title || "Nav Manager"}</h2>

            <div className="nav-add-form">
                <div className="formItem">
                    <TextInput
                        value={navData.name}
                        onChange={(e) => updateNavFormData(e, "name")}
                        placeholder="Nav Name"
                    />
                </div>
                <div className="formItem">
                    <TextInput
                        value={navData.url}
                        onChange={(e) => updateNavFormData(e, "url")}
                        placeholder="Nav Path"
                    />
                </div>
                <div className="formItem">
                    <Button
                        onClick={() => onAdd(navData)}
                        value="Add Nav"
                        disabled={
                            navData.name.trim() === '' ||
                            navData.url.trim() === ''
                        }
                    />
                </div>
            </div>

            <ul className="nav-list">
                {items.map((item, idx) => (
                    <li key={idx}>
                        <span className="nav-item-name">{renderItem(item)}</span>
                        <div>
                            <button onClick={() => onDelete(item._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}