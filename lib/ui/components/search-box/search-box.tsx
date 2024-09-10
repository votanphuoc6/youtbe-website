// import styles from './search-box.module.scss';
// import { Search } from "@mui/icons-material";
// import TextField from "@mui/material/TextField";
// import Autocomplete from '@mui/material/Autocomplete';
// import { useEffect, useRef, useState } from 'react';
// import { useSearchList } from '../../hooks/useSearchList';
// import { Subject, from } from 'rxjs';
// import { debounceTime, switchMap } from 'rxjs/operators';
// import { IYoutubeSearchItem } from '../../models/youtube-search-list.model';

// interface Props {
//     debouncePeriod?: number;
//     placeholder?: string;
//     inputChangeHandler: (value: IYoutubeSearchItem | string) => void
// }
// export default function SearchBox(props: Props) {
//     const { placeholder, debouncePeriod = 300 } = props;
//     const [inputValue, setInputValue] = useState<string>('');
//     const [options, setOptions] = useState<IYoutubeSearchItem[]>([]);
//     const { fetchSeachItems, isSearchItemsLoading } = useSearchList();
//     const optionSelected$ = useRef(new Subject<string>());

//     const getOptionLabel = (option: IYoutubeSearchItem | string): string => {
//         if (typeof option === 'string') {
//             return option;
//         }
//         return option.snippet?.title || ''
//     }

//     useEffect(() => {
//         const sub = optionSelected$.current
//             .pipe(
//                 debounceTime(debouncePeriod),
//                 switchMap((val) => from(fetchSeachItems({ query: val })))
//             )
//             .subscribe((data: IYoutubeSearchItem[] | undefined) => {
//                 const items = data || [];
//                 setOptions(items);
//             });

//         return () => sub?.unsubscribe();
//     }, [fetchSeachItems, debouncePeriod]);

//     useEffect(() => {
//         optionSelected$.current.next(inputValue);
//     }, [inputValue]);

//     return (
//         <div className={styles.host}>
//             <div className={styles.searchboxWrapper}>
//                 <div className={styles.searchboxField}>
//                     <Autocomplete
//                         freeSolo
//                         options={options}
//                         getOptionLabel={getOptionLabel}
//                         disableClearable
//                         loading={isSearchItemsLoading}
//                         filterOptions={(x) => x}
//                         sx={{ height: '100%', fontSize: '1.4rem' }}
//                         onChange={(event: any, newValue: IYoutubeSearchItem | string) => props?.inputChangeHandler(newValue)}
//                         onInputChange={(event, newInputValue) => {
//                             setInputValue(newInputValue);
//                         }}
//                         renderInput={(params) => {
//                             return (
//                                 <TextField {...params} label={placeholder} />
//                             )
//                            }
//                         }
//                     />

//                 </div>

//                 <div className={styles.searchboxIcon}>
//                     <Search />
//                 </div>
//             </div>
//         </div>
//     );
// }


import styles from './search-box.module.scss';
import { Search } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useRef, useState } from 'react';
import { Subject, from } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import axios from 'axios'; // Sử dụng axios để gọi API
import { IYoutubeSearchItem } from '../../models/youtube-search-list.model';

interface Props {
    debouncePeriod?: number;
    placeholder?: string;
    inputChangeHandler: (value: IYoutubeSearchItem | string) => void
}

export default function SearchBox(props: Props) {
    const { placeholder, debouncePeriod = 300 } = props;
    const [inputValue, setInputValue] = useState<string>(''); // Lưu giá trị input người dùng nhập
    const [options, setOptions] = useState<IYoutubeSearchItem[]>([]); // Lưu danh sách kết quả tìm kiếm
    const optionSelected$ = useRef(new Subject<string>());

    const getOptionLabel = (option: IYoutubeSearchItem | string): string => {
        if (typeof option === 'string') {
            return option;
        }
        return option.title || ''; // Lấy tiêu đề của video nếu có
    };

    // Gọi API tìm kiếm từ khóa
    const fetchSearchItems = async (query: string) => {
        try {
            const response = await axios.get(`https://giataicuachaapi.azurewebsites.net/api/Videos/search?keyword=${query}`);
            return response.data.videos; // Trả về danh sách video
        } catch (error) {
            console.error("Error fetching search items:", error);
            return [];
        }
    };

    useEffect(() => {
        const sub = optionSelected$.current
            .pipe(
                debounceTime(debouncePeriod), // Đợi 300ms trước khi gọi API
                switchMap((val) => from(fetchSearchItems(val))) // Gọi API và lấy kết quả tìm kiếm
            )
            .subscribe((data: IYoutubeSearchItem[] | undefined) => {
                const items = data || [];
                setOptions(items); // Cập nhật danh sách kết quả
            });

        return () => sub?.unsubscribe();
    }, [debouncePeriod]);

    useEffect(() => {
        if (inputValue.trim()) {
            optionSelected$.current.next(inputValue); // Trigger sự thay đổi khi người dùng nhập vào ô tìm kiếm
        }
    }, [inputValue]);

    return (
        <div className={styles.host}>
            <div className={styles.searchboxWrapper}>
                <div className={styles.searchboxField}>
                    <Autocomplete
                        freeSolo
                        options={options}
                        getOptionLabel={getOptionLabel}
                        disableClearable
                        loading={false} // Bỏ loading để không gây nhầm lẫn
                        filterOptions={(x) => x} // Hiển thị tất cả các kết quả mà không lọc thêm
                        onChange={(event: any, newValue: IYoutubeSearchItem | string) => props?.inputChangeHandler(newValue)}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue); // Cập nhật giá trị input khi người dùng nhập
                        }}
                        renderInput={(params) => {
                            return (
                                <TextField {...params} label={placeholder || 'Search...'} />
                            );
                        }}
                    />
                </div>

                <div className={styles.searchboxIcon}>
                    <Search />
                </div>
            </div>
        </div>
    );
}
