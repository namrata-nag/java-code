package Competitive;

public class SortedTriplet {
	void countTriplet(int ascMin[],int ascMax[]){
		int sum = 0;
		for(int k = 0;k<ascMin.length;k++){
			System.out.print("ASCENDING ORDER TRIPLET " + ascMin[k] +" " + ascMax[k] + "\n");
		}
		for(int k = 0;k<ascMin.length;k++){
			if(ascMin[k] !=0 && ascMax[k] !=0){
				sum = sum + ascMin[k]*ascMax[k] ;
			}
		}
		System.out.print("ASCENDING ORDER TRIPLET "+ sum);
	}
	public static void main(String []str){
		int arr[] = {1,2,3,4};
		int ascMin[] = new int[arr.length];
		int ascMax[] = new int[arr.length];
		int dscMax[] = new int[arr.length];
		int dscMin[] = new int[arr.length];
		
		int min = arr[0];
		int max = arr[arr.length -1];
		int count =0;
		
		
		for(int i =0;i<arr.length;i++){
			ascMin[i] = 0;
			ascMax[i]=0;
			dscMax[i] =0;
			dscMin[i] =0;
		}
		int prevMin =0;
		for(int j =1; j<arr.length ; ++j){
			if(min < arr[j] ){
				if(prevMin!= min){
					count = count +1;
				}
				
				ascMin[j]=count;
				prevMin = max;
			}
			else{
				prevMin = max;
				min = arr[j];
			}
		}
		count =0;
		int prevMax = 0;
		for(int j =arr.length -2; j>= 0 ; --j){
			
			if(max > arr[j]  ){
				if(prevMax!= max){
					count = count +1;
				}
				
				ascMax[j]=count;
				prevMax = max;
			}
			else{
				prevMax = max;
				max = arr[j];
			}
		}
		
		SortedTriplet obj = new SortedTriplet();
        obj.countTriplet(ascMin, ascMax);		
		
				
	}
}
