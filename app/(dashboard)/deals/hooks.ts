import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDeals, getDealFormData, createDeal, updateDealStage, deleteDeal, getDealStages, updateDeal } from './actions';

export function useDeals() {
    return useQuery({
        queryKey: ['deals'],
        queryFn: getDeals
    });
}

export function useDealStages() {
    const { data: stages, isLoading, error } = useQuery({
        queryKey: ['deal-stages'],
        queryFn: getDealStages
    });
    return { stages, isLoading, error };
}

export function useDealFormData(isOpen: boolean) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['deal-form-data'],
        queryFn: getDealFormData,
        enabled: isOpen
    });
    return { contacts: data?.contacts, entreprises: data?.entreprises, isLoading, error };
}

export function useCreateDeal() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createDeal,
        onSuccess: (result) => {
            if (result.success) {
                queryClient.invalidateQueries({ queryKey: ['deals'] });
            } else {
                console.error(result.error);
            }
        }
    });
}

export function useUpdateDeal() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, formData }: { id: number, formData: any }) => updateDeal(id, formData),
        onSuccess: (result) => {
            if (result.success) {
                queryClient.invalidateQueries({ queryKey: ['deals'] });
            } else {
                console.error(result.error);
            }
        }
    });
}

export function useUpdateDealStage() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, stageId }: { id: number, stageId: number }) => updateDealStage(id, stageId),
        // Optimistic update
        onMutate: async ({ id, stageId }) => {
            await queryClient.cancelQueries({ queryKey: ['deals'] });
            const previousDeals = queryClient.getQueryData(['deals']);
            queryClient.setQueryData(['deals'], (old: any) => {
                if (!old) return [];
                return old.map((d: any) => d.id === id ? { ...d, stageId } : d);
            });
            return { previousDeals };
        },
        onError: (err, variables, context) => {
            if (context?.previousDeals) {
                queryClient.setQueryData(['deals'], context.previousDeals);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['deals'] });
        }
    });
}

export function useDeleteDeal() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteDeal,
        onSuccess: (result) => {
            if (result.success) {
                queryClient.invalidateQueries({ queryKey: ['deals'] });
            }
        }
    });
}
