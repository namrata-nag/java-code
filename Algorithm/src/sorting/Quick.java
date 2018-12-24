package sorting;

public class Quick {
	void quickSort(int[] arr , int start , int end  ){
		int pivot = arr[end];
		int index = start;
		if(start >= end ){return;}
		if(true){
			for(int i =start;i<=end ;i++){
				if(arr[i]<=pivot){
					int tempt = arr[index];
					arr[index]=arr[i];
					arr[i] = tempt;
					index ++ ;
				}
				
			}
			index = index - 1;
			quickSort(arr,0,index-1 );
			quickSort(arr,index+1,end);
		}
		
		
		
	}
	public static void main(String[] arr){
		int arr1[] = {12,1,21,9,7,5,13,11,3,7};
		Quick obj = new Quick();
		obj.quickSort(arr1, 0,  arr1.length-1);
		System.out.println(arr1[0]+"and"+arr1[arr1.length-1]);
	}
}
