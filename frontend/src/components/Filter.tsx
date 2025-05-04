import {useState} from "react";
import * as React from "react";

interface FilterProps {
    onSearch: (searchQuery: string) => void;
    onIsRunningFilter: (filter: string) => void;
}

const runningFilterOptions = [
    {label: 'All', value: ''},
    {label: 'Running', value: 'true'},
    {label: 'Stopped', value: 'false'}
];

const Filter = ({onSearch, onIsRunningFilter}: FilterProps) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isRunningFilter, setIsRunningFilter] = useState<string>('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        onSearch(e.target.value);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFilter = e.target.value;
        setIsRunningFilter(selectedFilter);
        onIsRunningFilter(selectedFilter);
    };

    return (
        <div className="col-lg-8 d-flex gap-2">
            <input
                type="text"
                className="form-control"
                placeholder="Search by title or URL..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <select
                className="form-select ms-4"
                value={isRunningFilter}
                onChange={handleFilterChange}
            >
                {
                    runningFilterOptions.map((option) => (
                        <option value={option.value}>{option.label}</option>
                    ))
                }
            </select>
        </div>


    );

};

export default Filter;
